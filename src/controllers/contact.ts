import { NextFunction, Request, Response } from 'express'
import { addNew, deleteOne, fetchAll, fetchOne, updateOne } from '../services/contact'

export const getContacts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contacts = await fetchAll()
        if (!contacts) res.status(404).json({ error: true, message: 'Data not found' })
        return res.json(contacts)
    } catch (error) {
        next(error)
    }
}
export const getContactById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const contact = await fetchOne(id)
        if (!contact) return res.status(404).json({ error: true, message: 'Contact ID not found' })
        else return res.json(contact)
    } catch (error) {
        next(error)
    }
}
export const createContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contact = await addNew(req.body)
        if (!contact) res.status(409).json({ error: true, message: 'ID already exists' })
        else {
            console.log('Successfully created')
            res.json(contact)
        }
    } catch (error) {
        next(error)
    }
}
export const editContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const updatedContact = await updateOne(id, req.body)
        // if (!updatedContact) res.status(404).json({ error: true, message: 'Contact ID not found' })
        // else {
        console.log('Successfully edited')
        res.json(updatedContact)
        // }
    } catch (error) {
        next(error)
    }
}
export const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const deletedContact = await deleteOne(id)
        if (!deletedContact) res.status(404).json({ error: true, message: 'Contact ID not found' })
        else {
            console.log('Successfully deleted')
            res.json(deleteContact)
        }
    } catch (error) {
        next(error)
    }
}