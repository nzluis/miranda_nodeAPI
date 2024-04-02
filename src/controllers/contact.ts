import { Request, Response } from 'express'
import contacts from '../data/contacts.json'

export const fetchContacts = (req: Request, res: Response,) => {
    res.json(contacts)
}
export const fetchContactById = (req: Request, res: Response,) => {
    const id = req.params.id
    const contact = contacts.filter(contact => contact.id.toString() === id)
    if (id && contact.length !== 0) res.json(contact)
    else res.status(502).send('Not Found')
}
export const createContact = (req: Request, res: Response,) => {
    res.send('Create a Contact')
}
export const editContact = (req: Request, res: Response,) => {
    res.send('Edit a Contact')
}
export const deleteContact = (req: Request, res: Response,) => {
    res.send('Delete a Contact')
}