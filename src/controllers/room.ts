import { NextFunction, Request, Response } from 'express'
import { addNew, deleteOne, fetchAll, fetchOne, updateOne } from '../services/room'

export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = await fetchAll()
        return res.json(rooms)
    } catch (error) {
        next(error)
    }
}
export const getRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const room = await fetchOne(id)
        res.json(room)
    } catch (error) {
        next(error)
    }
}
export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const room = await addNew(req.body)
        console.log('Successfully created')
        res.json(room)
    } catch (error) {
        next(error)
    }
}
export const editRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const updatedRoom = await updateOne(id, req.body)
        console.log('Successfully edited')
        res.json(updatedRoom)
    } catch (error) {
        next(error)
    }
}
export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const deletedRoom = await deleteOne(id)
        console.log('Successfully deleted')
        res.json(deletedRoom)
    } catch (error) {
        next(error)
    }
}