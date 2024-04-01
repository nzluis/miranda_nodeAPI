import { Request, Response } from 'express'
import users from '../data/users.json'

export const fetchUsers = (req: Request, res: Response,) => {
    res.send('Fetch All Users')
}
export const fetchUserById = (req: Request, res: Response,) => {
    const id = req.params.id
    const user = users.filter(user => user.id === id)
    if (id && user.length !== 0) res.json(user)
    else res.status(502).send('Not Found')
}
export const createUser = (req: Request, res: Response,) => {
    res.send('Create a User')
}
export const editUser = (req: Request, res: Response,) => {
    res.send('Edit a User')
}
export const deleteUser = (req: Request, res: Response,) => {
    res.send('Delete a User')
}