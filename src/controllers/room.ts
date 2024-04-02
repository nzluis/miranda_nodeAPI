import { NextFunction, Request, Response } from 'express'
import roomsJson from '../data/rooms.json'
import { RoomData } from '../interfaces/Room'
import { delay } from '../utils/delay'

type RoomResponse = {
    data: RoomData | RoomData[] | undefined
    ok: boolean
}

export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: RoomResponse = await delay({ data: roomsJson, ok: true })
        if (!response.ok) res.status(502).send('Data not found')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const getRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const room: RoomData | undefined = roomsJson.find(room => room.id === id)
        const response = await delay({ data: room as RoomData, ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        if (!response.data) res.status(404).send('Room ID not found')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const roomAfterCreate = roomsJson.concat(req.body)
        const response: RoomResponse = await delay({ data: req.body, ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        console.log('Successfully created')
        res.send(response.data)
    } catch (error) {
        next(error)
    }
}
export const editRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        if (!roomsJson.some(room => room.id === id)) res.send('Unknown ID')
        // const roomsAfterEdit = roomsJson.map(room => room.id === id ? req.body : room)
        const response: RoomResponse = await delay({ data: req.body, ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        console.log('Successfully edited')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}
export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        if (!roomsJson.some(room => room.id === id)) res.send('Unknown ID')
        // const roomsAfterDelete = roomsJson.filter(room => room.id !== id)
        const response: RoomResponse = await delay({ data: id, ok: true })
        if (!response.ok) res.status(500).send('Not possible to access DB')
        console.log('Successfully deleted')
        res.json(response.data)
    } catch (error) {
        next(error)
    }
}