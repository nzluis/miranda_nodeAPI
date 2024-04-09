import mongoose from 'mongoose';
import { ContactData } from '../interfaces/Contact';
const { Schema } = mongoose;

const ContactSchema = new Schema<ContactData>({
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['Unread', 'Read'], required: true },
    date: { type: String, required: true },
})

export const Contact = mongoose.model<ContactData>('Contact', ContactSchema)
