import { NextFunction, Request, Response } from 'express'
import { addNew, deleteOne, fetchAll, fetchOne, updateOne } from '../services/contact'

export const getContacts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contacts = await fetchAll()
        return res.json(contacts)
    } catch (error) {
        next(error)
    }
}
export const getContactById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const contact = await fetchOne(id)
        res.json(contact)
    } catch (error) {
        next(error)
    }
}
export const createContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contact = await addNew(req.body)
        console.log('Successfully created')
        res.json(contact)
    } catch (error) {
        next(error)
    }
}
export const editContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const updatedContact = await updateOne(id, req.body)
        console.log('Successfully edited')
        res.json(updatedContact)
    } catch (error) {
        next(error)
    }
}
export const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const deletedContact = await deleteOne(id)
        console.log('Successfully deleted')
        console.log(deletedContact)
        res.json(deletedContact)
    } catch (error) {
        next(error)
    }
}