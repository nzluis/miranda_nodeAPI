import { NextFunction, Request, Response } from 'express'
import jwt = require('jsonwebtoken')

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const secretKey: string = process.env.SECRET_KEY || ''
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, secretKey, (err: any) => {
        if (err) return res.sendStatus(403)
        next()
    })
}