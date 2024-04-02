import express from 'express'
import { createBooking, deleteBooking, editBooking, fetchBookingById, fetchBookings } from '../controllers/booking'

export const bookingsRouter = express.Router()

bookingsRouter.get('/', fetchBookings)
bookingsRouter.get('/:id', fetchBookingById)
bookingsRouter.post('/create', createBooking)
bookingsRouter.put('/:id/update', editBooking)
bookingsRouter.delete('/:id/delete', deleteBooking)