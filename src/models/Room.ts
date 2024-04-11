import mongoose, { Schema } from 'mongoose'
import { RoomData } from '../interfaces/Room';

const RoomSchema = new Schema<RoomData>({
    photo: { type: String, required: [true, 'Photo is necessary'] },
    room_number: { type: String, required: [true, 'Room number is necessary'] },
    room_type: { type: String, required: [true, 'Room type is necessary'] },
    description: { type: String, required: [true, 'Description is necessary'] },
    offer: { type: Boolean, default: false, required: true },
    price: { type: String, required: [true, ' is necessary'] },
    discount: { type: String, default: '0', required: true },
    cancelation: { type: String, required: [true, 'Cancelation is necessary'] },
    amenities: [{ type: String, required: [true, 'Amenities is necessary'] }],
    status: { type: String, enum: ['Available', 'Booked'], required: [true, 'Status is necessary'] },
})

export const Room = mongoose.model<RoomData>('Room', RoomSchema)