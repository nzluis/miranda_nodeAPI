import express, { NextFunction, Request, Response } from 'express'
import { bookingsRouter } from './routes/booking'
import { roomsRouter } from './routes/room'
import { contactsRouter } from './routes/contact'
import { usersRouter } from './routes/user'
import { loginRouter } from './controllers/login'
import dotenv from 'dotenv'
import path from 'path'
import { authMiddleware } from './middleware/auth'

dotenv.config()

export const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
    const filePath = path.resolve(process.cwd(), 'index.html');
    res.sendFile(filePath)
})

app.use('/login', loginRouter)
app.use('/bookings', authMiddleware, bookingsRouter)
app.use('/rooms', authMiddleware, roomsRouter)
app.use('/contacts', authMiddleware, contactsRouter)
app.use('/users', authMiddleware, usersRouter)

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(error)
    return res.status(500).json({ message: 'Error from Server' })
})
