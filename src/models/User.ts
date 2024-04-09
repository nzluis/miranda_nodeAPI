import mongoose from 'mongoose';
import { UserData } from '../interfaces/User';
const { Schema } = mongoose;

const UserSchema = new Schema<UserData>({
    photo: { type: String, required: true },
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    start_date: { type: String, required: true },
    description: { type: String, required: true },
    position: { type: String, enum: ['Manager', 'Room Service', 'Receptionist'], required: true },
    phone: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Inactive'], required: true },
    password: { type: String, required: true },
})

export const User = mongoose.model<UserData>('User', UserSchema)
