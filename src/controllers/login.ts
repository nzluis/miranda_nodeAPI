import { NextFunction, Request, Response } from 'express'
import jwt = require('jsonwebtoken')
import express from 'express'
import bcrypt from "bcryptjs";
import { getUser } from '../services/login';
import { UserData } from '../interfaces/User';

export const loginRouter = express.Router()

loginRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: { email: string, password: string } = req.body
    try {
        const user: UserData | null = await getUser(email)
        if (!user) res.status(404).json({ error: true, message: 'User not found' })
        else if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ email: user.email, password: user.password }, process.env.SECRET_KEY as string)
            res.json({ AUTH_OK: 'Login successfully', token: token })
        }
        else res.json({ error: true, message: 'Incorrect Authentication' })
    } catch (error) {
        next(error)
    }
})