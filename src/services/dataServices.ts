import { readFileSync, writeFileSync } from 'fs'
import { BookingData } from '../interfaces/Booking'
import { RoomData } from '../interfaces/Room'
import { ContactData } from '../interfaces/Contact'
import { UserData } from '../interfaces/User'

type ArrayOfData = BookingData[] | RoomData[] | ContactData[] | UserData[] | []
type Data = BookingData | RoomData | ContactData | UserData
type DataResponse = {
    data: Data | null
    ok: boolean
}

export const fetchAll = (filename: string): { data: ArrayOfData, ok: boolean } => {
    const data: ArrayOfData = JSON.parse(readFileSync(`./tmp/${filename}.json`, 'utf-8'))
    if (!data || data.length === 0) return { data: [], ok: false }
    return { data, ok: true }
}

export const fetchOne = (id: string | number, filename: string): DataResponse => {
    const data: Data = JSON.parse(readFileSync(`./tmp/${filename}.json`, 'utf-8'))
        .find((element: Data) => element.id.toString() === id)
    if (!data) return { data: null, ok: false }
    return { data, ok: true }
}

export const addNew = (newAdded: Data, filename: string): DataResponse => {
    const data = JSON.parse(readFileSync(`./tmp/${filename}.json`, 'utf-8'))
    if (data.some((element: Data) => element.id === newAdded.id)) return { data: null, ok: false }
    const dataAfterAddNew = data.concat(newAdded)
    writeFileSync(`./tmp/${filename}.json`, JSON.stringify(dataAfterAddNew))
    return { data: newAdded, ok: true }
}

export const updateOne = (updatedData: Data, filename: string): DataResponse => {
    const data: ArrayOfData = JSON.parse(readFileSync(`./tmp/${filename}.json`, 'utf-8'))
    if (!data.some((element: Data) => element.id === updatedData.id)) return { data: null, ok: false }
    const dataAfterEdit = data.map((element: Data) => element.id === updatedData.id ? updatedData : element)
    writeFileSync(`./tmp/${filename}.json`, JSON.stringify(dataAfterEdit))
    return { data: updatedData, ok: true }
}

export const deleteOne = (id: string | number, filename: string): DataResponse => {
    const data: ArrayOfData = JSON.parse(readFileSync(`./tmp/${filename}.json`, 'utf-8'))
    const deletedData = data.find((element: Data) => element.id.toString() === id)
    if (!deletedData) return { data: null, ok: false }
    const dataAfterDelete = data.filter((element: Data) => element.id.toString() !== id)
    writeFileSync(`./tmp/${filename}.json`, JSON.stringify(dataAfterDelete))
    return { data: deletedData, ok: true }
}