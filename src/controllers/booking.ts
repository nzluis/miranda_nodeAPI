import { Request, Response } from 'express'
import bookings from '../data/bookings.json'

export const fetchBookings = (req: Request, res: Response) => {
    res.json(bookings)
}
export const fetchBookingById = (req: Request, res: Response) => {
    const id = req.params.id
    const booking = bookings.filter(booking => booking.id === id)
    if (id && booking.length !== 0) res.json(booking)
    else res.status(502).send('Not Found')
}
export const createBooking = (req: Request, res: Response) => {
    res.send('Create a Booking')
}
export const editBooking = (req: Request, res: Response) => {
    res.send('Edit a Booking')
}
export const deleteBooking = (req: Request, res: Response) => {
    res.send('Delete a Booking')
}