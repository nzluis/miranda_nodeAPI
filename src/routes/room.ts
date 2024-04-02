import express from 'express'
import { createRoom, deleteRoom, editRoom, getRoomById, getRooms } from '../controllers/room'

export const roomsRouter = express.Router()

roomsRouter.get('/', getRooms)
roomsRouter.get('/:id', getRoomById)
roomsRouter.post('/create', createRoom)
roomsRouter.put('/:id/update', editRoom)
roomsRouter.delete('/:id/delete', deleteRoom)