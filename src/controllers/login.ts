import { NextFunction, Request, Response } from 'express'
import express from 'express'
import { getUser } from '../services/login';

export const loginRouter = express.Router()

loginRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: { email: string, password: string } = req.body
    try {
        const authOk = await getUser(email, password)
        res.status(200).json({ authOk })
    } catch (error) {
        next(error)
    }
})