import mongoose, { Schema, InferSchemaType } from 'mongoose';

const BookingSchema = new Schema({
    order_date: { type: String, required: [true, 'Currently date is necessary'] },
    first_name: { type: String, required: [true, 'First name is necessary'] },
    last_name: { type: String, required: [true, 'Last name is necessary'] },
    check_in: { type: String, required: [true, 'Checkin date is necessary'] },
    check_out: { type: String, required: [true, 'Checkout date is necessary'] },
    request: { type: String },
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
    status: { type: String, enum: ['In Progress', 'Check Out', 'Check In'], required: true }
})

type Booking = InferSchemaType<typeof BookingSchema>

export const Booking = mongoose.model('Booking', BookingSchema)