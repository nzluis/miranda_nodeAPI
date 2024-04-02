import { NextFunction, Request, Response } from 'express'
import usersJson from '../data/users.json'
import { UserData } from '../interfaces/User'
import { delay } from '../utils/delay'

type UserResponse = {
    data: UserData | UserData[] | undefined
    ok: boolean
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: UserResponse = await delay({ data: usersJson, ok: true })
        if (!response.ok) res.status(502).send('Data not found')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const user: UserData | undefined = usersJson.find(user => user.id === id)
        const response = await delay({ data: user as UserData, ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        if (!response.data) res.status(404).send('User ID not found')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const userAfterCreate = usersJson.concat(req.body)
        const response: UserResponse = await delay({ data: req.body, ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        console.log('Successfully created')
        res.send(response.data)
    } catch (error) {
        next(error)
    }
}
export const editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        if (!usersJson.some(user => user.id === id)) res.send('Unknown ID')
        // const usersAfterEdit = usersJson.map(user => user.id === id ? req.body : user)
        const response: UserResponse = await delay({ data: req.body, ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        console.log('Successfully edited')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        if (!usersJson.some(user => user.id === id)) res.send('Unknown ID')
        // const usersAfterDelete = usersJson.filter(user => user.id !== id)
        const response: UserResponse = await delay({ data: id, ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        console.log('Successfully deleted')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}