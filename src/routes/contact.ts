import express from 'express'
import { createContact, deleteContact, editContact, fetchContactById, fetchContacts } from '../controllers/contact'

export const contactsRouter = express.Router()

contactsRouter.get('/', fetchContacts)
contactsRouter.get('/:id', fetchContactById)
contactsRouter.post('/create', createContact)
contactsRouter.put('/:id/update', editContact)
contactsRouter.delete('/:id/delete', deleteContact)