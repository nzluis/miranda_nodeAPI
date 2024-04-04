import { NextFunction, Request, Response } from 'express'
import { UserData } from '../interfaces/User'
import { delay } from '../utils/delay'
import { addNew, deleteOne, fetchAll, fetchOne, updateOne } from '../services/dataServices'

type UserResponse = {
    data: UserData | UserData[] | null
    ok: boolean
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: UserResponse = await delay({ data: fetchAll('users'), ok: true })
        if (!response.ok) res.status(404).json({ error: true, message: 'Data not found' })
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response: UserResponse = await delay(fetchOne(id, 'users'))
        if (!response.ok) res.status(404).json({ error: true, message: 'User ID not found' })
        else res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: UserResponse = await delay(addNew(req.body, 'users'))
        if (!response.ok) {
            res.status(409).send('ID already exists')
            console.log('Successfully created')
        }
        else res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: UserResponse = await delay(updateOne(req.body, 'users'))
        if (!response.ok) res.status(404).json({ error: true, message: 'User ID not found' })
        else {
            console.log('Successfully edited')
            res.json(response.data)
        }
    } catch (error) {
        next(error)
    }
}
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response: UserResponse = await delay(deleteOne(id, 'users'))
        if (!response.ok) res.status(404).json({ error: true, message: 'User ID not found' })
        else {
            console.log('Successfully deleted')
            res.json(response.data)
        }
    } catch (error) {
        next(error)
    }
}