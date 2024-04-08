import { NextFunction, Request, Response } from 'express'
import { addNew, deleteOne, fetchAll, fetchOne, updateOne } from '../services/booking'

export const getBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings = await fetchAll()
        // if (!bookings) res.status(404).json({ error: true, message: 'Data not found' })
        return res.json(bookings)
    } catch (error) {
        next(error)
    }
}
export const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const booking = await fetchOne(id)
        if (!booking) res.status(404).json({ error: true, message: 'Booking ID not found' })
        else res.json(booking)
    } catch (error) {
        next(error)
    }
}
export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = await addNew(req.body)
        if (!booking) res.status(409).json({ error: true, message: 'ID already exists' })
        else {
            console.log('Successfully created')
            res.json(booking)
        }
    } catch (error) {
        next(error)
    }
}
export const editBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const updatedBooking = await updateOne(id, req.body)
        if (!updatedBooking) res.status(404).json({ error: true, message: 'Booking ID not found' })
        else {
            console.log('Successfully edited')
            res.json(updatedBooking)
        }
    } catch (error) {
        next(error)
    }
}
export const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const deletedBooking = await deleteOne(id)
        if (!deletedBooking) res.status(404).json({ error: true, message: 'Booking ID not found' })
        else {
            console.log('Successfully deleted')
            res.json(deleteBooking)
        }
    } catch (error) {
        next(error)
    }
}