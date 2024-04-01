import express from 'express'
import { createContact, deleteContact, editContact, fetchContacts } from '../services/contact'

export const contactsRouter = express.Router()

contactsRouter.get('/', fetchContacts)
contactsRouter.get('/:id', fetchContacts)
contactsRouter.post('/:id', createContact)
contactsRouter.put('/:id', editContact)
contactsRouter.delete('/:id', deleteContact)