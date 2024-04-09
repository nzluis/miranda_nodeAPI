import { ContactData } from '../interfaces/Contact'
import { Contact } from '../models/Contact'

export const fetchAll = async () => {
    return await Contact.find()
}

export const fetchOne = async (id: string) => {
    return await Contact.findById(id).exec()
}

export const addNew = async (newAdded: ContactData) => {
    return await new Contact(newAdded).save()
}

export const updateOne = async (id: string, updatedData: ContactData) => {
    return await Contact.findByIdAndUpdate(id, updatedData)
}

export const deleteOne = async (id: string) => {
    return await Contact.findByIdAndDelete(id)
}