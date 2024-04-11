import { RoomData } from '../interfaces/Room'
import { Room } from '../models/Room'
import { ApiError } from '../utils/handleErrors'

export const fetchAll = async () => {
    const rooms = await Room.find()
    if (!rooms) throw new ApiError(404, 'Data Not Found')
    return rooms
}

export const fetchOne = async (id: string) => {
    const room = await Room.findById(id)
    if (!room) throw new ApiError(404, 'Room Id Not Found')
    return room
}

export const addNew = async (newAdded: RoomData) => {
    return await new Room(newAdded).save()
}

export const updateOne = async (id: string, updatedData: RoomData) => {
    const editRoom = await Room.findByIdAndUpdate(id, updatedData, { new: true })
    if (!editRoom) throw new ApiError(404, 'Room Id Not Found')
    return editRoom
}

export const deleteOne = async (id: string) => {
    const deletedRoom = await Room.findByIdAndDelete(id)
    if (!deletedRoom) throw new ApiError(404, 'Room Id Not Found')
    return deletedRoom
}