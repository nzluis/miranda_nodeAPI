import { Types } from "mongoose"

export interface ContactData {
    _id?: Types.ObjectId
    full_name: string
    email: string
    phone: string
    subject: string
    message: string
    status: string
    date: string
}
