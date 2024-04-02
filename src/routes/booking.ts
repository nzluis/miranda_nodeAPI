import express from 'express'
import { createBooking, deleteBooking, editBooking, getBookingById, getBookings } from '../controllers/booking'
import { authMiddleware } from '../middleware/auth'

export const bookingsRouter = express.Router()

bookingsRouter.get('/', getBookings)
bookingsRouter.get('/:id', getBookingById)
bookingsRouter.post('/create', authMiddleware, createBooking)
bookingsRouter.put('/:id/update', authMiddleware, editBooking)
bookingsRouter.delete('/:id/delete', authMiddleware, deleteBooking)