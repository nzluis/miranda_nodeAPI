import { Types } from "mongoose"

export interface UserData {
    _id?: Types.ObjectId
    photo: string
    full_name: string
    email: string
    start_date: string
    description: string
    position: string
    phone: string
    status: string
    password: string
}