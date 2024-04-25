import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config()

export const accessConfig = {
    host: 'localhost',
    user: 'root',
    database: 'mirandadb',
    password: process.env.SQL_PASSWORD
}

export async function connectSQL() {
    try {
        const connection = await mysql.createConnection(accessConfig);
        console.log('Connected to SQL')
        return connection
    } catch (err) {
    console.log(err);
    }
}
