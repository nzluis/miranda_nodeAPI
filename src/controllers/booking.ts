import { NextFunction, Request, Response } from 'express'
import { BookingData } from '../interfaces/Booking'
import { delay } from '../utils/delay'
import { addNew, deleteOne, fetchAll, fetchOne, updateOne } from '../services/dataServices'

type BookingResponse = {
    data: BookingData | BookingData[] | null
    ok: boolean
}

export const getBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: BookingResponse = await delay(fetchAll('bookings'))
        if (!response.ok) res.status(404).json({ error: true, message: 'Data not found' })
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response: BookingResponse = await delay(fetchOne(id, 'bookings'))
        if (!response.ok) res.status(404).json({ error: true, message: 'Booking ID not found' })
        else res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: BookingResponse = await delay(addNew(req.body, 'bookings'))
        if (!response.ok) {
            res.status(409).send('ID already exists')
            console.log('Successfully created')
        }
        else res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const editBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: BookingResponse = await delay(updateOne(req.body, 'bookings'))
        if (!response.ok) res.status(404).json({ error: true, message: 'Booking ID not found' })
        else {
            console.log('Successfully edited')
            res.json(response.data)
        }
    } catch (error) {
        next(error)
    }
}
export const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response: BookingResponse = await delay(deleteOne(id, 'bookings'))
        if (!response.ok) res.status(404).json({ error: true, message: 'Booking ID not found' })
        else {
            console.log('Successfully deleted')
            res.json(response.data)
        }
    } catch (error) {
        next(error)
    }
}