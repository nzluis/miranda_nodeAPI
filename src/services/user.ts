import { UserData } from '../interfaces/User'
import { User } from '../models/User'
import { checkPassword } from '../utils/checkPassword'
import { ApiError } from '../utils/handleErrors'

export const fetchAll = async () => {
    const users = await User.find()
    if (!users) throw new ApiError(404, 'Data Not Found')
    return users
}

export const fetchOne = async (id: string) => {
    const user = await User.findById(id)
    if (!user) throw new ApiError(404, 'User Id Not Found')
    return user
}

export const addNew = async (newAdded: UserData) => {
    return await new User(newAdded).save()
}

export const updateOne = async (id: string, updatedData: UserData) => {
    const user = await User.findById(id)
    if (!user) throw new ApiError(404, 'User Id Not Found')
    const checkedPasswordUser = checkPassword(updatedData, user)
    return await User.findByIdAndUpdate(id, checkedPasswordUser, { new: true })
}

export const deleteOne = async (id: string) => {
    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) throw new ApiError(404, 'User Id Not Found')
    return deletedUser
}