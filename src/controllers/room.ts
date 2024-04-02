import express from 'express'
import { createRoom, deleteRoom, editRoom, fetchRoomById, fetchRooms } from '../services/room'

export const roomsRouter = express.Router()

roomsRouter.get('/', fetchRooms)
roomsRouter.get('/:id', fetchRoomById)
roomsRouter.post('/:id/create', createRoom)
roomsRouter.put('/:id/update', editRoom)
roomsRouter.delete('/:id/delete', deleteRoom)