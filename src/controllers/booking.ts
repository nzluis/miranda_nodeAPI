import { NextFunction, Request, Response } from 'express'
import { addNew, deleteOne, fetchAll, fetchOne, updateOne } from '../services/booking'

export const getBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings = await fetchAll()
        return res.json(bookings)
    } catch (error) {
        next(error)
    }
}
export const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const booking = await fetchOne(id)
        res.json(booking)
    } catch (error) {
        next(error)
    }
}
export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = await addNew(req.body)
        console.log('Successfully created')
        res.json(booking)
    } catch (error) {
        next(error)
    }
}
export const editBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const updatedBooking = await updateOne(id, req.body)
        console.log('Successfully edited')
        res.json(updatedBooking)
    } catch (error) {
        next(error)
    }
}
export const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const deletedBooking = await deleteOne(id)
        console.log('Successfully deleted')
        res.json(deletedBooking)
    } catch (error) {
        next(error)
    }
}