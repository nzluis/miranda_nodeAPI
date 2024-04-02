import express, { Request, Response } from 'express'
import { bookingsRouter } from './routes/booking'
import { roomsRouter } from './routes/room'
import { contactsRouter } from './routes/contact'
import { usersRouter } from './routes/user'
import { loginRouter } from './controllers/login'
import dotenv from 'dotenv'
import { authMiddleware } from './middleware/auth'

dotenv.config()

export const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
    res.json({ Listen: 'Running App on server' })
})

app.use('/login', loginRouter)
app.use('/bookings', authMiddleware, bookingsRouter)
app.use('/rooms', authMiddleware, roomsRouter)
app.use('/contacts', authMiddleware, contactsRouter)
app.use('/users', authMiddleware, usersRouter)
