import { NextFunction, Request, Response } from 'express'
import { ContactData } from '../interfaces/Contact'
import { delay } from '../utils/delay'
import { addNew, deleteOne, fetchAll, fetchOne, updateOne } from '../services/dataServices'

type ContactResponse = {
    data: ContactData | ContactData[] | undefined
    ok: boolean
}

export const getContacts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: ContactResponse = await delay({ data: fetchAll('contacts'), ok: true })
        if (!response.ok) res.status(502).send('Data not found')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const getContactById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response = await delay({ data: fetchOne(Number(id), 'contacts'), ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        else if (!response.data) res.status(404).send('Contact ID not found')
        else res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const createContact = (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: ContactResponse = { data: req.body, ok: true }
        if (!addNew(req.body, 'contacts')) res.send('ID already exists')
        else if (!response.ok) {
            res.status(500).send('Not possible to access DB')
        }
        else {
            console.log('Successfully created')
            res.send(response.data)
        }
    } catch (error) {
        next(error)
    }
}
export const editContact = (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: ContactResponse = { data: req.body, ok: true }
        if (!updateOne(req.body, 'contacts')) res.send('Unknown ID')
        else if (!response.ok) {
            res.status(500).send('Not possible to access DB')
        }
        else {
            console.log('Successfully edited')
            res.json(response.data)
        }
    } catch (error) {
        next(error)
    }
}
export const deleteContact = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response: { data: ContactData, ok: boolean } = { data: req.body, ok: true }
        if (!deleteOne(Number(id), 'contacts')) res.send('Unknown ID')
        else if (!response.ok) {
            res.status(500).send('Not possible to access DB')
        }
        else {
            console.log('Successfully deleted')
            res.json(response.data!.id)
        }
    } catch (error) {
        next(error)
    }
}