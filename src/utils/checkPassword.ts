import bcrypt from "bcryptjs";
import { UserData } from "../interfaces/User";

export const checkPassword = (dataToUpdate: UserData, storedData: UserData) => {
    if (bcrypt.compareSync(dataToUpdate.password, storedData.password)) {
        return {
            ...dataToUpdate,
            password: storedData.password
        }
    } else {
        console.log('New Password Created')
        return {
            ...dataToUpdate,
            password: bcrypt.hashSync(dataToUpdate.password, bcrypt.genSaltSync(10))
        }
    }
}