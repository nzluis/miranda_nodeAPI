import { BookingData } from '../interfaces/Booking'
import { Booking } from '../models/Booking'
import { ApiError } from '../utils/handleErrors'

export const fetchAll = async () => {
    const bookings = await Booking.find().populate('room')
    if (!bookings) throw new ApiError(404, 'Data Not Found')
    return bookings
}

export const fetchOne = async (id: string) => {
    const booking = await Booking.findById(id).populate('room')
    if (!booking) throw new ApiError(404, 'Booking Id Not Found')
    return booking
}

export const addNew = async (newAdded: BookingData) => {
    return await new Booking(newAdded).save()
}

export const updateOne = async (id: string, updatedData: BookingData) => {
    const editBooking = await Booking.findByIdAndUpdate(id, updatedData, { new: true })
    if (!editBooking) throw new ApiError(404, 'Booking Id Not Found')
    return editBooking
}

export const deleteOne = async (id: string) => {
    const deletedBooking = await Booking.findByIdAndDelete(id)
    if (!deletedBooking) throw new ApiError(404, 'Booking Id Not Found')
    return deletedBooking
}