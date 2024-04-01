import express from 'express'
import { createBooking, deleteBooking, editBooking, fetchBookingById, fetchBookings } from '../services/booking'

export const bookingsRouter = express.Router()

bookingsRouter.get('/', fetchBookings)
bookingsRouter.get('/:id', fetchBookingById)
bookingsRouter.post('/:id', createBooking)
bookingsRouter.put('/:id', editBooking)
bookingsRouter.delete('/:id', deleteBooking)