import { User } from "../models/User"
import { ApiError } from "../utils/handleErrors"
import jwt = require('jsonwebtoken')
import bcrypt from "bcryptjs";

export const getUser = async (email: string, password: string) => {
    const user = await User.findOne({ email })
    if (!user) throw new ApiError(404, 'Email Not Found')
    if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY as string)
        return { msg: 'Login successfully', token: token }
    }
    else throw new ApiError(403, 'Incorrect Authentication')
}