import { RoomData } from '../interfaces/Room'
import { Room } from '../models/Room'

export const fetchAll = async () => {
    return await Room.find()
}

export const fetchOne = async (id: string) => {
    return await Room.findById(id).exec()
}

export const addNew = async (newAdded: RoomData) => {
    return await new Room(newAdded).save()
}

export const updateOne = async (id: string, updatedData: RoomData) => {
    return await Room.findByIdAndUpdate(id, updatedData)
}

export const deleteOne = async (id: string) => {
    return await Room.findByIdAndDelete(id)
}