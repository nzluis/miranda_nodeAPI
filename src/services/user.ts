import { UserData } from '../interfaces/User'
import { ApiError } from '../controllers/errorHandler'
import { querySQL } from '../utils/sqlQuery'
// import { checkPassword } from '../utils/checkPassword'

export const fetchAll = async () => {
    return await querySQL(`SELECT * FROM user`)
}

export const fetchOne = async (id: string) => {
    const user = await querySQL(`SELECT * FROM user WHERE _id = ?`, [id])
    if (Object.keys(user).length === 0) throw new ApiError(404, 'User Id Not Found')
    return user
}

export const addNew = async (newAdded: UserData) => {
    const newUser = await querySQL(`INSERT INTO user (
        photo, full_name, email, description, position, phone, status, password) 
        VALUES (?,?,?,?,?,?,?,?,?);`, [
            newAdded.photo,
            newAdded.full_name,
            newAdded.email,
            newAdded.description,
            newAdded.position,
            newAdded.phone,
            newAdded.status,
            newAdded.password,
        ])
    return newUser
}

export const updateOne = async (id: string, updatedData: UserData) => {
    const foundUser = await querySQL(`SELECT * FROM user WHERE _id = ?;`, [id])
    if (Object.keys(foundUser).length === 0) throw new ApiError(404, 'User Id Not Found')
    // const checkedPasswordUser = checkPassword(updatedData, foundUser)
    const editedUser = await querySQL(`UPDATE user
        SET photo = ?, full_name = ?, email = ?, description = ?, position = ?, phone = ?, status = ?, password = ? 
        WHERE _id = ?;`, [
            updatedData.photo,
            updatedData.full_name,
            updatedData.email,
            updatedData.description,
            updatedData.position,
            updatedData.phone,
            updatedData.status,
            updatedData.password,
            id
        ])
    return editedUser
}

export const deleteOne = async (id: string) => {
    const deletedUser = await querySQL(`DELETE FROM user WHERE _id = ?`, [id])
    if (Object.keys(deletedUser).length === 0) throw new ApiError(404, 'User Id Not Found')
    return deletedUser
}
