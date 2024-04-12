import { NextFunction, Request, Response } from 'express'
import jwt = require('jsonwebtoken')
import { ApiError } from '../controllers/errorHandler'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const secretKey = process.env.SECRET_KEY
    if (!secretKey) throw new ApiError(500, 'Secret Key is undefined')
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) throw new ApiError(401, 'Unauthorized Access')
    try {
        jwt.verify(token, secretKey)
        next()
    } catch (error: any) {
        throw new ApiError(403, 'Wrong Authentication.Token is not correct')
    }
}