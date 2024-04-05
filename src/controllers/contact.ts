import { NextFunction, Request, Response } from 'express'
import { ContactData } from '../interfaces/Contact'
import { delay } from '../utils/delay'
import { addNew, deleteOne, fetchAll, fetchOne, updateOne } from '../services/dataServices'

type ContactResponse = {
    data: ContactData | ContactData[] | null
    ok: boolean
}

export const getContacts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: ContactResponse = await delay(fetchAll('contacts'))
        if (!response.ok) res.status(404).json({ error: true, message: 'Data not found' })
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const getContactById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response: ContactResponse = await delay(fetchOne(id, 'contacts'))
        if (!response.ok) res.status(404).json({ error: true, message: 'Contact ID not found' })
        else res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const createContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: ContactResponse = await delay(addNew(req.body, 'contacts'))
        if (!response.ok) {
            res.status(409).send('ID already exists')
            console.log('Successfully created')
        }
        else res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const editContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: ContactResponse = await delay(updateOne(req.body, 'contacts'))
        if (!response.ok) res.status(404).json({ error: true, message: 'Contact ID not found' })
        else {
            console.log('Successfully edited')
            res.json(response.data)
        }
    } catch (error) {
        next(error)
    }
}
export const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response: ContactResponse = await delay(deleteOne(id, 'contacts'))
        if (!response.ok) res.status(404).json({ error: true, message: 'Contact ID not found' })
        else {
            console.log('Successfully deleted')
            res.json(response.data)
        }
    } catch (error) {
        next(error)
    }
}