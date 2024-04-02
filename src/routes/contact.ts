import express from 'express'
import { createContact, deleteContact, editContact, getContactById, getContacts } from '../controllers/contact'

export const contactsRouter = express.Router()

contactsRouter.get('/', getContacts)
contactsRouter.get('/:id', getContactById)
contactsRouter.post('/create', createContact)
contactsRouter.put('/:id/update', editContact)
contactsRouter.delete('/:id/delete', deleteContact)