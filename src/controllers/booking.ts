import { NextFunction, Request, Response } from 'express'
import { BookingData } from '../interfaces/Booking'
import { delay } from '../utils/delay'
import { addNew, deleteOne, fetchAll, fetchOne, updateOne } from '../services/dataServices'

type BookingResponse = {
    data: BookingData | BookingData[] | undefined
    ok: boolean
}

export const getBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: BookingResponse = await delay({ data: fetchAll('bookings'), ok: true })
        if (!response.ok) res.status(502).send('Data not found')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response = await delay({ data: fetchOne(id, 'bookings'), ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        else if (!response.data) res.status(404).send('Booking ID not found')
        else res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const createBooking = (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: BookingResponse = { data: req.body, ok: true }
        if (!addNew(req.body, 'bookings')) res.send('ID already exists')
        else if (!response.ok) {
            res.status(500).send('Not possible to access DB')
        }
        else {
            console.log('Successfully created')
            res.send(response.data)
        }
    } catch (error) {
        next(error)
    }
}
export const editBooking = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response: BookingResponse = { data: req.body, ok: true }
        if (!updateOne(id, 'bookings', req.body)) res.send('Unknown ID')
        else if (!response.ok) {
            res.status(500).send('Not possible to access DB')
        }
        else {
            console.log('Successfully edited')
            res.json(response.data)
        }
    } catch (error) {
        next(error)
    }
}
export const deleteBooking = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response: { data: BookingData, ok: boolean } = { data: req.body, ok: true }
        if (!deleteOne(id, 'bookings')) res.send('Unknown ID')
        else if (!response.ok) {
            res.status(500).send('Not possible to access DB')
        }
        else {
            console.log('Successfully deleted')
            res.json(response.data!.id)
        }
    } catch (error) {
        next(error)
    }
}