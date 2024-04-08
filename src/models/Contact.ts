import mongoose from 'mongoose';
import { ContactData } from '../interfaces/Contact';
const { Schema } = mongoose;

const ContactSchema = new Schema<ContactData>({
    _id: String,
    full_name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    status: String,
    date: String,
})

export const Contact = mongoose.model('Contact', ContactSchema)
