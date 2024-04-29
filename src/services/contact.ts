import { ContactData } from '../interfaces/Contact'
import { ApiError } from '../controllers/errorHandler'
import { querySQL } from '../utils/sqlQuery'

export const fetchAll = async () => {
    return await querySQL(`SELECT * FROM contact`)
}

export const fetchOne = async (id: string) => {
    const contact = await querySQL(`SELECT * FROM contact WHERE _id = ?`, [id])
    if (Object.keys(contact).length === 0) throw new ApiError(404, 'Contact Id Not Found')
    return contact
}

export const addNew = async (newAdded: ContactData) => {
    const newUser = await querySQL(`INSERT INTO contact (
        full_name, email, phone, subject, message, status) 
        VALUES (?,?,?,?,?,?,?,?,?);`, [
            newAdded.full_name,
            newAdded.email,
            newAdded.phone,
            newAdded.subject,
            newAdded.message,
            newAdded.status,
        ])
    return newUser
}

export const updateOne = async (id: string, updatedData: ContactData) => {
    const editedContact = await querySQL(`SELECT * FROM contact WHERE _id = ?;`, [id])
    if (Object.keys(editedContact).length === 0) throw new ApiError(404, 'Contact Id Not Found')
    const editedUser = await querySQL(`UPDATE contact
        SET full_name = ?, email = ?, phone = ?, subject = ?, message = ?, status = ? 
        WHERE _id = ?;`, [
            updatedData.full_name,
            updatedData.email,
            updatedData.phone,
            updatedData.subject,
            updatedData.message,
            updatedData.status,
            id
        ])
    return editedUser
}

export const deleteOne = async (id: string) => {
    const deletedContact = await querySQL(`DELETE FROM contact WHERE _id = ?`, [id])
    if (Object.keys(deletedContact).length === 0) throw new ApiError(404, 'Contact Id Not Found')
    return deletedContact
}