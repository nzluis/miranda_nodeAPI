import mongoose, { Schema } from 'mongoose'
import { RoomData } from '../interfaces/Room';

const RoomSchema = new Schema<RoomData>({
    photo: { type: String, required: true },
    room_number: { type: String, required: true },
    room_type: { type: String, required: true },
    description: { type: String, required: true },
    offer: { type: Boolean, required: true },
    price: { type: String, required: true },
    discount: { type: String, required: true },
    cancelation: { type: String, required: true },
    amenities: [{ type: String, required: true }],
    status: { type: String, enum: ['Available', 'Booked'], required: true },
})

export const Room = mongoose.model<RoomData>('Room', RoomSchema)