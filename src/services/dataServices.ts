import { readFileSync, writeFileSync } from 'fs'
import { BookingData } from '../interfaces/Booking'
import { RoomData } from '../interfaces/Room'
import { ContactData } from '../interfaces/Contact'
import { UserData } from '../interfaces/User'

type ArraysOfData = BookingData[] | RoomData[] | ContactData[] | UserData[]
type Data = BookingData | RoomData | ContactData | UserData

export const fetchAll = (filename: string): ArraysOfData | [] => {
    return JSON.parse(readFileSync(`./src/data/${filename}.json`, 'utf-8'))
}

export const fetchOne = (id: string | number, filename: string): Data => {
    const data = JSON.parse(readFileSync(`./src/data/${filename}.json`, 'utf-8'))
    return data.find((element: Data) => element.id === id)
}

export const addNew = (newAdded: Data, filename: string): boolean => {
    const data = JSON.parse(readFileSync(`./src/data/${filename}.json`, 'utf-8'))
    if (data.some((element: Data) => element.id === newAdded.id)) return false
    const dataAfterAddNew = data.concat(newAdded)
    writeFileSync(`./src/data/${filename}.json`, JSON.stringify(dataAfterAddNew))
    return true
}

export const updateOne = (id: string | number, filename: string, updatedData: Data): boolean => {
    const data = JSON.parse(readFileSync(`./src/data/${filename}.json`, 'utf-8'))
    if (!data.some((element: Data) => element.id === id)) return false
    const dataAfterEdit = data.map((element: Data) => element.id === id ? updatedData : element)
    writeFileSync(`./src/data/${filename}.json`, JSON.stringify(dataAfterEdit))
    return true
}

export const deleteOne = (id: string | number, filename: string): boolean => {
    const data = JSON.parse(readFileSync(`./src/data/${filename}.json`, 'utf-8'))
    if (!data.some((element: Data) => element.id === id)) return false
    const dataAfterDelete = data.filter((element: Data) => element.id !== id)
    writeFileSync(`./src/data/${filename}.json`, JSON.stringify(dataAfterDelete))
    return true
}