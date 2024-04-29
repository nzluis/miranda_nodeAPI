import { BookingData } from '../interfaces/Booking'
import { ApiError } from '../controllers/errorHandler'
import { querySQL } from '../utils/sqlQuery'

export const fetchAll = async () => {
    return await querySQL(`SELECT * FROM booking`)
}

export const fetchOne = async (id: string) => {
    const booking = await querySQL(`SELECT * FROM booking WHERE _id = ?`, [id])
    if (Object.keys(booking).length === 0) throw new ApiError(404, 'Booking Id Not Found')
    return booking
}

export const addNew = async (newAdded: BookingData) => {
    const newBooking = await querySQL(`INSERT INTO booking (
        first_name, last_name, check_in, check_out, request, room, status) 
        VALUES (?,?,?,?,?,?,?,?,?);`, [
            newAdded.first_name,
            newAdded.last_name,
            newAdded.check_in,
            newAdded.check_out,
            newAdded.request,
            newAdded.room,
            newAdded.status,
        ])
    return newBooking
}

export const updateOne = async (id: string, updatedData: BookingData) => {
    const foundBooking = await querySQL(`SELECT * FROM booking WHERE _id = ?;`, [id])
    if (Object.keys(foundBooking).length === 0) throw new ApiError(404, 'Booking Id Not Found')
    const editedBooking = await querySQL(`UPDATE booking
        SET first_name = ?, last_name = ?, check_in = ?, check_out = ?, request = ?, room = ?, status = ? 
        WHERE _id = ?;`, [
            updatedData.first_name,
            updatedData.last_name,
            updatedData.check_in,
            updatedData.check_out,
            updatedData.request,
            updatedData.room,
            updatedData.status,
            id
        ])
    return editedBooking
}

export const deleteOne = async (id: string) => {
    const deletedBooking = await querySQL(`DELETE FROM booking WHERE _id = ?`, [id])
    if (Object.keys(deletedBooking).length === 0) throw new ApiError(404, 'Booking Id Not Found')
    return deletedBooking
}