import { NextFunction, Request, Response } from 'express'
import { RoomData } from '../interfaces/Room'
import { delay } from '../utils/delay'
import { addNew, deleteOne, fetchAll, fetchOne, updateOne } from '../services/dataServices'

type RoomResponse = {
    data: RoomData | RoomData[] | null
    ok: boolean
}

export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: RoomResponse = await delay({ data: fetchAll('rooms'), ok: true })
        if (!response.ok) res.status(404).json({ error: true, message: 'Data not found' })
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const getRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response: RoomResponse = await delay(fetchOne(id, 'rooms'))
        if (!response.ok) res.status(404).json({ error: true, message: 'Room ID not found' })
        else res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: RoomResponse = await delay(addNew(req.body, 'rooms'))
        if (!response.ok) {
            res.status(409).send('ID already exists')
            console.log('Successfully created')
        }
        else res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const editRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: RoomResponse = await delay(updateOne(req.body, 'rooms'))
        if (!response.ok) res.status(404).json({ error: true, message: 'Room ID not found' })
        else {
            console.log('Successfully edited')
            res.json(response.data)
        }
    } catch (error) {
        next(error)
    }
}
export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response: RoomResponse = await delay(deleteOne(id, 'rooms'))
        if (!response.ok) res.status(404).json({ error: true, message: 'Room ID not found' })
        else {
            console.log('Successfully deleted')
            res.json(response.data)
        }
    } catch (error) {
        next(error)
    }
}