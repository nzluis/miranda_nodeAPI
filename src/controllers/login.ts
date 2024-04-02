import { Request, Response } from 'express'
import jwt = require('jsonwebtoken')
import express from 'express'

export const loginRouter = express.Router()

loginRouter.post('/', (req: Request, res: Response) => {
    const user = req.body
    if (user.email === 'admin@example.es' && user.password === 'admin') {
        const token = jwt.sign({ email: user.email, password: user.password }, process.env.SECRET_KEY as string)
        res.json({ AUTH_OK: 'Login successfully', token: token })
    }
    else res.send('Incorrect Authentication')
})