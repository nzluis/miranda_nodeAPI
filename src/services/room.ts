import { Request, Response } from 'express'
import rooms from '../data/rooms.json'

export const fetchRooms = (req: Request, res: Response,) => {
    res.send('Fetch All Rooms')
}
export const fetchRoomById = (req: Request, res: Response,) => {
    const id = req.params.id
    const room = rooms.filter(room => room.id === id)
    if (id && rooms.length !== 0) res.json(room)
    else res.status(502).send('Not Found')
}
export const createRoom = (req: Request, res: Response,) => {
    res.send('Create a Room')
}
export const editRoom = (req: Request, res: Response,) => {
    res.send('Edit a Room')
}
export const deleteRoom = (req: Request, res: Response,) => {
    res.send('Delete a Room')
}