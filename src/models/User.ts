import mongoose from 'mongoose';
import { UserData } from '../interfaces/User';
const { Schema } = mongoose;

const UserSchema = new Schema<UserData>({
    photo: { type: String, required: [true, 'Photo is necessary'] },
    full_name: { type: String, required: [true, 'Name is necessary'] },
    email: { type: String, required: [true, 'Email is necessary'], unique: true },
    start_date: { type: String, required: [true, 'Start date is necessary'] },
    description: { type: String, required: [true, 'Decription is necessary'] },
    position: { type: String, enum: ['Manager', 'Room Service', 'Receptionist'], required: [true, 'Position is necessary'] },
    phone: { type: String, required: [true, 'Phone is necessary'] },
    status: { type: String, enum: ['Active', 'Inactive'], required: [true, 'Status is necessary'] },
    password: { type: String, required: [true, 'Password is necessary'] },
})

export const User = mongoose.model<UserData>('User', UserSchema)
