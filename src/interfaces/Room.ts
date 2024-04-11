import { Types } from "mongoose"

export interface RoomData {
    _id?: Types.ObjectId
    photo: string
    room_number: string
    room_type: string
    description: string
    offer: boolean
    price: string
    discount: string
    cancelation: string
    amenities: string[]
    status: string
}
