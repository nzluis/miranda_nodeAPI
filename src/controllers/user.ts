import express from 'express'
import { createUser, deleteUser, editUser, fetchUserById, fetchUsers } from '../services/user'

export const usersRouter = express.Router()

usersRouter.get('/', fetchUsers)
usersRouter.get('/:id', fetchUserById)
usersRouter.post('/:id', createUser)
usersRouter.put('/:id', editUser)
usersRouter.delete('/:id', deleteUser)