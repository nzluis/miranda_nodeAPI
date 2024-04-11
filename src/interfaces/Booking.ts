import { Types } from 'mongoose';

export interface BookingData {
    _id?: Types.ObjectId
    order_date: string
    first_name: string
    last_name: string
    check_in: string
    check_out: string
    request: string
    room?: Types.ObjectId
    status: string
}
