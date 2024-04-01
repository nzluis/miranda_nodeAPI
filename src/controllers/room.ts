import express from 'express'
import { createRoom, deleteRoom, editRoom, fetchRoomById, fetchRooms } from '../services/room'

export const roomsRouter = express.Router()

roomsRouter.get('/', fetchRooms)
roomsRouter.get('/:id', fetchRoomById)
roomsRouter.post('/:id', createRoom)
roomsRouter.put('/:id', editRoom)
roomsRouter.delete('/:id', deleteRoom)