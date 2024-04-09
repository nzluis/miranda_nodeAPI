import { Types } from 'mongoose';

export interface BookingData {
    order_date: string
    first_name: string
    last_name: string
    check_in: string
    check_out: string
    request: string
    room_type?: string
    room_number?: string
    room: Types.ObjectId
    status: string
}
