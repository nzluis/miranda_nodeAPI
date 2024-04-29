import { RoomData } from '../interfaces/Room'
import { ApiError } from '../controllers/errorHandler'
import { querySQL } from '../utils/sqlQuery'

export const fetchAll = async () => {
    return await querySQL(`SELECT * FROM room`)
}

export const fetchOne = async (id: string) => {
    const room = await querySQL(`SELECT * FROM room WHERE _id = ?`, [id])
    if (Object.keys(room).length === 0) throw new ApiError(404, 'Room Id Not Found')
    return room
}

export const addNew = async (newAdded: RoomData) => {
    const newRoom = await querySQL(`INSERT INTO room (
        cancelation, description, offer, photo, price, discount, room_number, room_type, status) 
        VALUES (?,?,?,?,?,?,?,?,?);`, [
            newAdded.cancelation,
            newAdded.description,
            newAdded.offer,
            newAdded.photo,
            newAdded.price,
            newAdded.discount,
            newAdded.room_number,
            newAdded.room_type,
            newAdded.status
        ])
    return newRoom
}

export const updateOne = async (id: string, updatedData: RoomData) => {
    const foundRoom = await querySQL(`SELECT * FROM room WHERE _id = ?;`, [id])
    if (Object.keys(foundRoom).length === 0) throw new ApiError(404, 'Room Id Not Found')
    const editedRoom = await querySQL(`UPDATE room
        SET cancelation = ?, description = ?, offer = ?, photo = ?, price = ?, discount = ?, room_number = ?, room_type = ?, status = ? 
        WHERE _id = ?;`, [
            updatedData.cancelation,
            updatedData.description,
            updatedData.offer,
            updatedData.photo,
            updatedData.price,
            updatedData.discount,
            updatedData.room_number,
            updatedData.room_type,
            updatedData.status,
            id
        ])
    return editedRoom
}

export const deleteOne = async (id: string) => {
    const deletedRoom = await querySQL(`DELETE FROM room WHERE _id = ?`, [id])
    if (Object.keys(deletedRoom).length === 0) throw new ApiError(404, 'Room Id Not Found')
    return deletedRoom
}