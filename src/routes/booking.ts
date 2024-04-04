import express from 'express'
import { createBooking, deleteBooking, editBooking, getBookingById, getBookings } from '../controllers/booking'

export const bookingsRouter = express.Router()

bookingsRouter.get('/', getBookings)
bookingsRouter.get('/:id', getBookingById)
bookingsRouter.post('/create', createBooking)
bookingsRouter.put('/:id/update', editBooking)
bookingsRouter.delete('/:id/delete', deleteBooking)