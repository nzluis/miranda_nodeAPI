import express, { Request, Response } from 'express'
import { bookingsRouter } from './controllers/booking'
import { roomsRouter } from './controllers/room'
import { contactsRouter } from './controllers/contact'
import { usersRouter } from './controllers/user'

export const app = express()

app.get('/', (_req: Request, res: Response) => {
    res.json({ Listening: 'Running App' })
})

app.use('/bookings', bookingsRouter)
app.use('/rooms', roomsRouter)
app.use('/contacts', contactsRouter)
app.use('/users', usersRouter)
