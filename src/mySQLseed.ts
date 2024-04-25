import mysql from 'mysql2/promise';
import { faker } from '@faker-js/faker';
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'
import { accessConfig } from './utils/mySqlConnection';
dotenv.config()

const TOTAL_RECORDS = 10;

async function createRoom(){
    const connection: any = await mysql.createConnection(accessConfig);
        connection.execute(`INSERT INTO room (
        cancelation, description, offer, photo, price, discount, room_number, room_type, status) 
        VALUES (
            '${faker.lorem.sentence(15)}',
            '${faker.lorem.sentence(25)}',
            ${faker.datatype.boolean()},
            'https://picsum.photos/100/50',
            '${faker.helpers.rangeToNumber({ min: 100, max: 400 }).toString()}',
            '${faker.helpers.rangeToNumber({ min: 1, max: 85 }).toString()}',
            '${faker.helpers.rangeToNumber({ min: 1, max: 100 }).toString()}',
            '${faker.helpers.arrayElement(['Single Bed', 'Double Bed', 'Double Superior', 'Suite'])}',
            '${faker.helpers.arrayElement(['Available', 'Booked'])}');`);
}

async function createBooking(){
    const connection: any = await mysql.createConnection(accessConfig);
    connection.execute(`INSERT INTO booking (
    first_name, last_name, check_in, check_out, request, room, status, order_date) 
    VALUES (
        "${faker.person.firstName()}",
        "${faker.person.lastName()}",
        '${(faker.date.anytime()).toISOString().slice(0,10)}',
        '${(faker.date.anytime()).toISOString().slice(0,10)}',
        '${faker.lorem.sentence(20)}',
        ${Math.ceil(Math.random() * (TOTAL_RECORDS - 1))},
        '${faker.helpers.arrayElement(['In Progress', 'Check Out', 'Check In'])}',
        '${(faker.date.anytime()).toISOString().slice(0,10)}');`);
}

async function createContact(){
    const connection: any = await mysql.createConnection(accessConfig);
    connection.execute(`INSERT INTO contact (
    full_name, email, phone, subject, message, status) 
    VALUES (
        "${faker.person.fullName()}",
        '${faker.internet.email()}',
        '${faker.phone.number()}',
        '${faker.word.words({ count: { min: 2, max: 7 }})}',
        '${faker.lorem.sentence({ min: 25, max: 35 })}',
        '${faker.helpers.arrayElement(['Unread', 'Read'])}');`);
}

async function createUser(){
    const connection: any = await mysql.createConnection(accessConfig);
    connection.execute(`INSERT INTO user (
    photo, full_name, email, phone, password, description, position, status) 
    VALUES (
        'https://i.pravatar.cc/50',
        "${faker.person.fullName()}",
        "${faker.internet.email()}",
        '${faker.phone.number()}',
        '${bcrypt.hashSync(faker.internet.password(), bcrypt.genSaltSync(10))}',
        '${faker.lorem.sentence({ min: 25, max: 35 })}',
        '${faker.helpers.arrayElement(['Manager', 'Room Service', 'Receptionist'])}',
        '${faker.helpers.arrayElement(['Active', 'Inactive'])}');`);
}

async function seedSQL() {
    for (let i=0; i < TOTAL_RECORDS; i++) {
        await createRoom()
    }
    for (let i=0; i < TOTAL_RECORDS; i++) {
        await createContact()
        await createUser()
        await createBooking()
        if(i === TOTAL_RECORDS - 1 ) console.log('Seed completed')
    }
}

seedSQL()