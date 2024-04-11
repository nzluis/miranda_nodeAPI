import bcrypt from "bcryptjs";
import { UserData } from "../interfaces/User";

export const checkPassword = (updatedData: UserData, storedData: UserData) => {
    if (bcrypt.compareSync(updatedData.password, storedData.password)) {
        return {
            ...updatedData,
            password: storedData.password
        }
    } else {
        console.log('New Password Created')
        return {
            ...updatedData,
            password: bcrypt.hashSync(updatedData.password, bcrypt.genSaltSync(10))
        }
    }
}