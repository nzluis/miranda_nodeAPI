import { NextFunction, Request, Response } from 'express'
import { addNew, deleteOne, fetchAll, fetchOne, updateOne } from '../services/booking'

export const getBookings = (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings = fetchAll()
        if (!bookings) res.status(404).json({ error: true, message: 'Data not found' })
        else res.json(bookings)
    } catch (error) {
        next(error)
    }
}
export const getBookingById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const booking = fetchOne(id)
        if (!booking) res.status(404).json({ error: true, message: 'Booking ID not found' })
        else res.json(booking)
    } catch (error) {
        next(error)
    }
}
export const createBooking = (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = addNew(req.body)
        if (!booking) res.status(409).json({ error: true, message: 'ID already exists' })
        else {
            console.log('Successfully created')
            res.json(booking)
        }
    } catch (error) {
        next(error)
    }
}
export const editBooking = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const updatedBooking = updateOne(id, req.body)
        if (!updatedBooking) res.status(404).json({ error: true, message: 'Booking ID not found' })
        else {
            console.log('Successfully edited')
            res.json(updatedBooking)
        }
    } catch (error) {
        next(error)
    }
}
export const deleteBooking = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const deletedBooking = deleteOne(id)
        if (!deletedBooking) res.status(404).json({ error: true, message: 'Booking ID not found' })
        else {
            console.log('Successfully deleted')
            res.json(deleteBooking)
        }
    } catch (error) {
        next(error)
    }
}