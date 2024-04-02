import { NextFunction, Request, Response } from 'express'
import contactsJson from '../data/contacts.json'
import { ContactData } from '../interfaces/Contact'
import { delay } from '../utils/delay'

type ContactResponse = {
    data: ContactData | ContactData[] | undefined
    ok: boolean
}

export const getContacts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: ContactResponse = await delay({ data: contactsJson, ok: true })
        if (!response.ok) res.status(502).send('Data not found')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const getContactById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const contact: ContactData | undefined = contactsJson.find(contact => contact.id === Number(id))
        const response = await delay({ data: contact as ContactData, ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        if (!response.data) res.status(404).send('Contact ID not found')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const createContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const contactAfterCreate = contactsJson.concat(req.body)
        const response: ContactResponse = await delay({ data: req.body, ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        console.log('Successfully created')
        res.send(response.data)
    } catch (error) {
        next(error)
    }
}
export const editContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        if (!contactsJson.some(contact => contact.id === Number(id))) res.send('Unknown ID')
        // const contactsAfterEdit = contactsJson.map(contact => contact.id === id ? req.body : contact)
        const response: ContactResponse = await delay({ data: req.body, ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        console.log('Successfully edited')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        if (!contactsJson.some(contact => contact.id === Number(id))) res.send('Unknown ID')
        // const contactsAfterDelete = contactsJson.filter(contact => contact.id !== id)
        const response: ContactResponse = await delay({ data: id, ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        console.log('Successfully deleted')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}