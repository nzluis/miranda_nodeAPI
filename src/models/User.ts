import mongoose from 'mongoose';
import { UserData } from '../interfaces/User';
const { Schema } = mongoose;

const UserSchema = new Schema<UserData>({
    _id: String,
    photo: String,
    full_name: String,
    email: String,
    start_date: String,
    description: String,
    position: String,
    phone: String,
    status: String,
    password: String,
})

export const User = mongoose.model('User', UserSchema)
