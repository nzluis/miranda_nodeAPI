import { NextFunction, Request, Response } from 'express'
import { addNew, deleteOne, fetchAll, fetchOne, updateOne } from '../services/room'

export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = await fetchAll()
        if (!rooms) res.status(404).json({ error: true, message: 'Data not found' })
        return res.json(rooms)
    } catch (error) {
        next(error)
    }
}
export const getRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const room = await fetchOne(id)
        if (!room) return res.status(404).json({ error: true, message: 'Room ID not found' })
        else return res.json(room)
    } catch (error) {
        next(error)
    }
}
export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const room = await addNew(req.body)
        if (!room) res.status(409).json({ error: true, message: 'ID already exists' })
        else {
            console.log('Successfully created')
            res.json(room)
        }
    } catch (error) {
        next(error)
    }
}
export const editRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const updatedRoom = await updateOne(id, req.body)
        // if (!updatedRoom) res.status(404).json({ error: true, message: 'Room ID not found' })
        // else {
        console.log('Successfully edited')
        res.json(updatedRoom)
        // }
    } catch (error) {
        next(error)
    }
}
export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const deletedRoom = await deleteOne(id)
        if (!deletedRoom) res.status(404).json({ error: true, message: 'Room ID not found' })
        else {
            console.log('Successfully deleted')
            res.json(deleteRoom)
        }
    } catch (error) {
        next(error)
    }
}