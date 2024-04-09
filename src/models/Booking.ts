import mongoose, { Schema, InferSchemaType } from 'mongoose';

const BookingSchema = new Schema({
    order_date: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    check_in: { type: String, required: true },
    check_out: { type: String, required: true },
    request: { type: String, required: true },
    room_type: { type: String, required: true },
    room_number: { type: String, required: true },
    status: { type: String, required: true }
})

type Booking = InferSchemaType<typeof BookingSchema>

export const Booking = mongoose.model('Booking', BookingSchema)