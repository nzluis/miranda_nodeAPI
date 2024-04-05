import { NextFunction, Request, Response } from 'express'
import jwt = require('jsonwebtoken')

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const secretKey = process.env.SECRET_KEY
    if (!secretKey) throw new Error('Secret Key is undefined')
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    try {
        const user = jwt.verify(token, secretKey)
        if (!user) return res.sendStatus(403)
        next()
    } catch (error) {
        console.error(error)
        throw new Error('Auth internal error')
    }
}