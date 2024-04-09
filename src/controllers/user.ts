import { NextFunction, Request, Response } from 'express'
import { addNew, deleteOne, fetchAll, fetchOne, updateOne } from '../services/user'

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await fetchAll()
        if (!users) res.status(404).json({ error: true, message: 'Data not found' })
        return res.json(users)
    } catch (error) {
        next(error)
    }
}
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const user = await fetchOne(id)
        if (!user) return res.status(404).json({ error: true, message: 'User ID not found' })
        else return res.json(user)
    } catch (error) {
        next(error)
    }
}
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await addNew(req.body)
        if (!user) res.status(409).json({ error: true, message: 'ID already exists' })
        else {
            console.log('Successfully created')
            res.json(user)
        }
    } catch (error) {
        next(error)
    }
}
export const editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const updatedUser = await updateOne(id, req.body)
        // if (!updatedUser) res.status(404).json({ error: true, message: 'User ID not found' })
        // else {
        console.log('Successfully edited')
        res.json(updatedUser)
        // }
    } catch (error) {
        next(error)
    }
}
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const deletedUser = await deleteOne(id)
        if (!deletedUser) res.status(404).json({ error: true, message: 'User ID not found' })
        else {
            console.log('Successfully deleted')
            res.json(deleteUser)
        }
    } catch (error) {
        next(error)
    }
}