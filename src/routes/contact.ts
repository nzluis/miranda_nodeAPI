import express from 'express'
import { createContact, deleteContact, editContact, getContactById, getContacts } from '../controllers/contact'
import { authMiddleware } from '../middleware/auth'

export const contactsRouter = express.Router()

contactsRouter.get('/', getContacts)
contactsRouter.get('/:id', getContactById)
contactsRouter.post('/create', authMiddleware, createContact)
contactsRouter.put('/:id/update', authMiddleware, editContact)
contactsRouter.delete('/:id/delete', authMiddleware, deleteContact)