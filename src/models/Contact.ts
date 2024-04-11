import mongoose from 'mongoose';
import { ContactData } from '../interfaces/Contact';
const { Schema } = mongoose;

const ContactSchema = new Schema<ContactData>({
    full_name: { type: String, required: [true, 'Name is necessary'] },
    email: { type: String, required: [true, 'Email is necessary'] },
    phone: { type: String, required: [true, 'Phone is necessary'] },
    subject: { type: String, required: [true, 'Subject is necessary'] },
    message: { type: String, required: [true, 'Message is necessary'] },
    status: { type: String, enum: ['Unread', 'Read'], required: [true, 'Status is necessary'] },
    date: { type: String, required: [true, 'Date is necessary'] },
})

export const Contact = mongoose.model<ContactData>('Contact', ContactSchema)
