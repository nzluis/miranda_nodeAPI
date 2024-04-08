import mongoose from 'mongoose';
import { BookingData } from '../interfaces/Booking';
const { Schema } = mongoose;

const BookingSchema = new Schema<BookingData>({
    _id: String,
    order_date: Date,
    first_name: String,
    last_name: String,
    check_in: Date,
    check_out: Date,
    request: String,
    room_type: String,
    room_number: String,
    status: String
})

export const Booking = mongoose.model('Booking', BookingSchema)