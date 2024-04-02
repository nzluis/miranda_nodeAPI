import express from 'express'
import { createUser, deleteUser, editUser, getUserById, getUsers } from '../controllers/user'

export const usersRouter = express.Router()

usersRouter.get('/', getUsers)
usersRouter.get('/:id', getUserById)
usersRouter.post('/create', createUser)
usersRouter.put('/:id/update', editUser)
usersRouter.delete('/:id/delete', deleteUser)