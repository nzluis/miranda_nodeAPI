import { NextFunction, Request, Response } from 'express'
import { UserData } from '../interfaces/User'
import { delay } from '../utils/delay'
import { addNew, deleteOne, fetchAll, fetchOne, updateOne } from '../services/dataServices'

type UserResponse = {
    data: UserData | UserData[] | undefined
    ok: boolean
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: UserResponse = await delay({ data: fetchAll('users'), ok: true })
        if (!response.ok) res.status(502).send('Data not found')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response = await delay({ data: fetchOne(id, 'users'), ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        else if (!response.data) res.status(404).send('User ID not found')
        else res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const createUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: UserResponse = { data: req.body, ok: true }
        if (!addNew(req.body, 'users')) res.send('ID already exists')
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
export const editUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response: UserResponse = { data: req.body, ok: true }
        if (!updateOne(id, 'users', req.body)) res.send('Unknown ID')
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
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response: { data: UserData, ok: boolean } = { data: req.body, ok: true }
        if (!deleteOne(id, 'users')) res.send('Unknown ID')
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