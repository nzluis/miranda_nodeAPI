import { NextFunction, Request, Response } from 'express'
import { RoomData } from '../interfaces/Room'
import { delay } from '../utils/delay'
import { addNew, deleteOne, fetchAll, fetchOne, updateOne } from '../services/dataServices'

type RoomResponse = {
    data: RoomData | RoomData[] | undefined
    ok: boolean
}

export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: RoomResponse = await delay({ data: fetchAll('rooms'), ok: true })
        if (!response.ok) res.status(502).send('Data not found')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const getRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response = await delay({ data: fetchOne(id, 'rooms'), ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        else if (!response.data) res.status(404).send('Room ID not found')
        else res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const createRoom = (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: RoomResponse = { data: req.body, ok: true }
        if (!addNew(req.body, 'rooms')) res.send('ID already exists')
        else if (!response.ok) {
            res.status(500).send('Not possible to access DB')
        }
        else {
            console.log('Successfully created')
            res.send(response.data)
        }
    } catch (error) {
        next(error)
    }
}
export const editRoom = (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: RoomResponse = { data: req.body, ok: true }
        if (!updateOne(req.body, 'rooms')) res.send('Unknown ID')
        else if (!response.ok) {
            res.status(500).send('Not possible to access DB')
        }
        else {
            console.log('Successfully edited')
            res.json(response.data)
        }
    } catch (error) {
        next(error)
    }
}
export const deleteRoom = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response: { data: RoomData, ok: boolean } = { data: req.body, ok: true }
        if (!deleteOne(id, 'rooms')) res.send('Unknown ID')
        else if (!response.ok) {
            res.status(500).send('Not possible to access DB')
        }
        else {
            console.log('Successfully deleted')
            res.json(response.data!.id)
        }
    } catch (error) {
        next(error)
    }
}