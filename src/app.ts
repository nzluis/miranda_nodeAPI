import express, { Request, Response } from 'express'
import { bookingsRouter } from './routes/booking'
import { roomsRouter } from './routes/room'
import { contactsRouter } from './routes/contact'
import { usersRouter } from './routes/user'
import { loginRouter } from './controllers/login'
import dotenv from 'dotenv'
import path from 'path'
import { authMiddleware } from './middleware/auth'
import mongoose from 'mongoose'
import { errorHandler } from './utils/handleErrors'

dotenv.config()

export const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL_TEST!)
    .then(() => {
        console.log('Connected to mongodb')
    })
    .catch(() => {
        console.log('Error connecting mongodb')
    })

app.get('/', (_req: Request, res: Response) => {
    const filePath = path.resolve(process.cwd(), 'index.html');
    res.sendFile(filePath)
})

app.use('/login', loginRouter)
app.use('/bookings', authMiddleware, bookingsRouter)
app.use('/rooms', authMiddleware, roomsRouter)
app.use('/contacts', authMiddleware, contactsRouter)
app.use('/users', authMiddleware, usersRouter)

app.use(errorHandler)
