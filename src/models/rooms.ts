import mongoose from 'mongoose';
import { RoomData } from '../interfaces/Room';
const { Schema } = mongoose;

const RoomSchema = new Schema<RoomData>({
    _id: String,
    photo: String,
    room_number: String,
    room_type: String,
    description: String,
    offer: Boolean,
    price: String,
    discount: String,
    cancelation: String,
    amenities: [{ type: String }],
    status: String,
})

export const Booking = mongoose.model('Booking', RoomSchema)
