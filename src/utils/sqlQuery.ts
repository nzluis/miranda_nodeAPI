import { connectSQL } from "./mySqlConnection";

export const querySQL = async (query: string, params?: any[]) => {
    const connection = await connectSQL()
    const [results] = await connection!.execute(query, params)
    return results
}