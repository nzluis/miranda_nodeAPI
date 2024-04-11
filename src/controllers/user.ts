import { NextFunction, Request, Response } from 'express'
import { addNew, deleteOne, fetchAll, fetchOne, updateOne } from '../services/user'
import bcrypt from "bcryptjs";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await fetchAll()
        return res.json(users)
    } catch (error) {
        next(error)
    }
}
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const user = await fetchOne(id)
        res.json(user)
    } catch (error) {
        next(error)
    }
}
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hashedUser = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        }
        const user = await addNew(hashedUser)
        console.log('Successfully created')
        res.json(user)
        // }
    } catch (error) {
        next(error)
    }
}
export const editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const updatedUser = await updateOne(id, req.body)
        console.log('Successfully edited')
        res.json(updatedUser)
    } catch (error) {
        next(error)
    }
}
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const deletedUser = await deleteOne(id)
        console.log('Successfully deleted')
        res.json(deletedUser)
    } catch (error) {
        next(error)
    }
}