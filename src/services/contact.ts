import { ContactData } from '../interfaces/Contact'
import { Contact } from '../models/Contact'
import { ApiError } from '../utils/handleErrors'

export const fetchAll = async () => {
    const contacts = await Contact.find()
    if (!contacts) throw new ApiError(404, 'Data Not Found')
    return contacts
}

export const fetchOne = async (id: string) => {
    const contact = await Contact.findById(id)
    if (!contact) throw new ApiError(404, 'Contact Id Not Found')
    return contact
}

export const addNew = async (newAdded: ContactData) => {
    return await new Contact(newAdded).save()
}

export const updateOne = async (id: string, updatedData: ContactData) => {
    const editedContact = await Contact.findByIdAndUpdate(id, updatedData, { new: true })
    if (!editedContact) throw new ApiError(404, 'Contact Id Not Found')
    return editedContact
}

export const deleteOne = async (id: string) => {
    const deletedContact = await Contact.findByIdAndDelete(id)
    if (!deletedContact) throw new ApiError(404, 'Contact Id Not Found')
    return deletedContact
}