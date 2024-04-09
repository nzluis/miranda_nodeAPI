import { User } from "../models/User"

export const getUser = (email: string) => {
    return User.findOne({ email })
}