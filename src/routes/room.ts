import express from 'express'
import { createRoom, deleteRoom, editRoom, fetchRoomById, fetchRooms } from '../controllers/room'

export const roomsRouter = express.Router()

roomsRouter.get('/', fetchRooms)
roomsRouter.get('/:id', fetchRoomById)
roomsRouter.post('/create', createRoom)
roomsRouter.put('/:id/update', editRoom)
roomsRouter.delete('/:id/delete', deleteRoom)