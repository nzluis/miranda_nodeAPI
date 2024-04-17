import { NextFunction, Request, Response } from 'express'
import express from 'express'
import { getUser } from '../services/login';

export const loginRouter = express.Router()

loginRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { email, pass }: { email: string, pass: string } = req.body
    try {
        const authOkData = await getUser(email, pass)
        res.status(200).json(authOkData)
    } catch (error) {
        next(error)
    }
})