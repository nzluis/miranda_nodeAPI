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
import { errorHandler } from './controllers/errorHandler'
import cors from 'cors'

dotenv.config()

export const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    "origin": process.env.NODE_ENV === 'dev' ? 'http://localhost:5173' : "http://dashboardmirandanzluis.s3-website.eu-west-3.amazonaws.com",
    "methods": "GET,HEAD,PUT,POST,DELETE",
}))

mongoose.connect(process.env.MONGODB_URI_TEST!)
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
