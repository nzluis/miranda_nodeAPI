import { BookingData } from '../interfaces/Booking'
import { Booking } from '../models/Booking'

export const fetchAll = async () => {
    return await Booking.find()
}

export const fetchOne = async (id: string) => {
    return await Booking.findById(id).exec()
}

export const addNew = async (newAdded: BookingData) => {
    return await new Booking(newAdded).save()
}

export const updateOne = async (id: string, updatedData: BookingData) => {
    return await Booking.findByIdAndUpdate(id, updatedData)
}

export const deleteOne = async (id: string) => {
    return await Booking.findByIdAndDelete(id)
}