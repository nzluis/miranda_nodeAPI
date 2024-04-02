import express from 'express'
import { createUser, deleteUser, editUser, getUserById, getUsers } from '../controllers/user'
import { authMiddleware } from '../middleware/auth'

export const usersRouter = express.Router()

usersRouter.get('/', getUsers)
usersRouter.get('/:id', getUserById)
usersRouter.post('/create', authMiddleware, createUser)
usersRouter.put('/:id/update', authMiddleware, editUser)
usersRouter.delete('/:id/delete', authMiddleware, deleteUser)