import express from 'express'
import { createUser, deleteUser, editUser, fetchUsers } from '../services/user'

export const usersRouter = express.Router()

usersRouter.get('/', fetchUsers)
usersRouter.get('/:id', fetchUsers)
usersRouter.post('/:id', createUser)
usersRouter.put('/:id', editUser)
usersRouter.delete('/:id', deleteUser)