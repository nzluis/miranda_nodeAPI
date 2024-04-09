import mongoose, { Schema, InferSchemaType } from 'mongoose';

const BookingSchema = new Schema({
    order_date: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    check_in: { type: String, required: true },
    check_out: { type: String, required: true },
    request: { type: String, required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
    status: { type: String, enum: ['In Progress', 'Check Out', 'Check In'], required: true }
})

type Booking = InferSchemaType<typeof BookingSchema>

export const Booking = mongoose.model('Booking', BookingSchema)