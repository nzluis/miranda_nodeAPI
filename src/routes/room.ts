import express from 'express'
import { createRoom, deleteRoom, editRoom, getRoomById, getRooms } from '../controllers/room'
import { authMiddleware } from '../middleware/auth'

export const roomsRouter = express.Router()

roomsRouter.get('/', getRooms)
roomsRouter.get('/:id', getRoomById)
roomsRouter.post('/create', authMiddleware, createRoom)
roomsRouter.put('/:id/update', authMiddleware, editRoom)
roomsRouter.delete('/:id/delete', authMiddleware, deleteRoom)