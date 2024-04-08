import mongoose, { Schema, InferSchemaType } from 'mongoose';

const BookingSchema = new Schema({
    _id: Schema.Types.UUID,
    order_date: { type: String, required: true },
    first_name: String,
    last_name: String,
    check_in: String,
    check_out: String,
    request: String,
    room_type: String,
    room_number: String,
    status: String
})

type Booking = InferSchemaType<typeof BookingSchema>

export const Booking = mongoose.model('Booking', BookingSchema)