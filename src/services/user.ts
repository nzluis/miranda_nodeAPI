import { UserData } from '../interfaces/User'
import { User } from '../models/User'

export const fetchAll = async () => {
    return await User.find()
}

export const fetchOne = async (id: string) => {
    return await User.findById(id).exec()
}

export const addNew = async (newAdded: UserData) => {
    return await new User(newAdded).save()
}

export const updateOne = async (id: string, updatedData: UserData) => {
    return await User.findByIdAndUpdate(id, updatedData)
}

export const deleteOne = async (id: string) => {
    return await User.findByIdAndDelete(id)
}