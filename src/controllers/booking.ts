import { NextFunction, Request, Response } from 'express'
import bookingsJson from '../data/bookings.json'
import { BookingData } from '../interfaces/Booking'
import { delay } from '../utils/delay'

type BookingResponse = {
    data: BookingData | BookingData[] | undefined
    ok: boolean
}

export const getBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: BookingResponse = await delay({ data: bookingsJson, ok: true })
        if (!response.ok) res.status(502).send('Data not found')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const booking: BookingData | undefined = bookingsJson.find(booking => booking.id === id)
        const response = await delay({ data: booking as BookingData, ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        if (!response.data) res.status(404).send('Booking ID not found')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const bookingAfterCreate = bookingsJson.concat(req.body)
        const response: BookingResponse = await delay({ data: req.body, ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        console.log('Successfully created')
        res.send(response.data)
    } catch (error) {
        next(error)
    }
}
export const editBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        if (!bookingsJson.some(booking => booking.id === id)) res.send('Unknown ID')
        // const bookingsAfterEdit = bookingsJson.map(booking => booking.id === id ? req.body : booking)
        const response: BookingResponse = await delay({ data: req.body, ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        console.log('Successfully edited')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        if (!bookingsJson.some(booking => booking.id === id)) res.send('Unknown ID')
        // const bookingsAfterDelete = bookingsJson.filter(booking => booking.id !== id)
        const response: BookingResponse = await delay({ data: id, ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        console.log('Successfully deleted')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}