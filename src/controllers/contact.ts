import express from 'express'
import { createContact, deleteContact, editContact, fetchContactById, fetchContacts } from '../services/contact'

export const contactsRouter = express.Router()

contactsRouter.get('/', fetchContacts)
contactsRouter.get('/:id', fetchContactById)
contactsRouter.post('/:id/create', createContact)
contactsRouter.put('/:id/update', editContact)
contactsRouter.delete('/:id/delete', deleteContact)