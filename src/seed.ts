import { faker } from '@faker-js/faker';
import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'
import bcrypt from "bcryptjs";
import { UserData } from './interfaces/User';
import { ContactData } from './interfaces/Contact';
import { RoomData } from './interfaces/Room';
import { BookingData } from './interfaces/Booking';
import dotenv from 'dotenv'
import { Room } from './models/Room';
dotenv.config()

const roomsId = [
    { _id: new ObjectId('66225aebf6d85ae5de950c9b') },
    { _id: new ObjectId('66225aebf6d85ae5de950c9c') },
    { _id: new ObjectId('66225aebf6d85ae5de950c9d') },
    { _id: new ObjectId('66225aebf6d85ae5de950c9e') },
    { _id: new ObjectId('66225aebf6d85ae5de950c9f') },
    { _id: new ObjectId('66225aebf6d85ae5de950ca0') },
    { _id: new ObjectId('66225aebf6d85ae5de950ca1') },
    { _id: new ObjectId('66225aebf6d85ae5de950ca2') },
    { _id: new ObjectId('66225aebf6d85ae5de950ca3') },
    { _id: new ObjectId('66225aebf6d85ae5de950ca4') }
]

function createRoom(): RoomData {
    return {
        photo: 'https://picsum.photos/100/50',
        room_number: faker.helpers.rangeToNumber({ min: 1, max: 100 }).toString(),
        room_type: faker.helpers.arrayElement(['Single Bed', 'Double Bed', 'Double Superior', 'Suite']),
        description: faker.lorem.sentence(25),
        offer: faker.datatype.boolean(),
        price: faker.helpers.rangeToNumber({ min: 100, max: 400 }).toString(),
        discount: faker.helpers.rangeToNumber({ min: 1, max: 85 }).toString(),
        cancelation: faker.lorem.sentence(15),
        amenities: ["AC", "Jacuzzi", "King Size Bed", '60" TV', "Wifi"],
        status: faker.helpers.arrayElement(['Available', 'Booked']),
    }
}
function createContact(): ContactData {
    return {
        full_name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        subject: faker.word.words({ count: { min: 2, max: 7 } }),
        message: faker.lorem.sentence({ min: 25, max: 35 }),
        status: faker.helpers.arrayElement(['Unread', 'Read']),
        date: Date.now().toString(),
    }
}
function createUser() {
    const raw_password = faker.internet.password()
    const newUser: UserData = {
        photo: 'https://i.pravatar.cc/50',
        full_name: faker.person.fullName(),
        email: faker.internet.email(),
        start_date: new Date(faker.date.anytime()).getTime().toString(),
        description: faker.lorem.sentence({ min: 10, max: 35 }),
        position: faker.helpers.arrayElement(['Manager', 'Room Service', 'Receptionist']),
        phone: faker.phone.number(),
        status: faker.helpers.arrayElement(['Active', 'Inactive']),
        password: bcrypt.hashSync(raw_password, bcrypt.genSaltSync(10)),
    }
    console.log(`${newUser.email}: ${raw_password}`)
    return newUser
}

export async function seedDB(database: string) {
    await mongoose.connect(database === 'test' ? process.env.MONGODB_URI_TEST! : process.env.MONGODB_URI!)
    const client = mongoose.connection.getClient()
    try {
        const roomsCollection = client.db(database).collection("rooms");
        const contactsCollection = client.db(database).collection("contacts");
        const usersCollection = client.db(database).collection("users");

        await roomsCollection.drop();
        await contactsCollection.drop();
        await usersCollection.drop();

        const rooms = [];
        const contacts = [];
        const users = [];

        for (let i = 0; i < 10; i++) {
            const newRoom = createRoom()
            const newContact = createContact()
            const newUser = createUser()

            rooms.push(newRoom);
            contacts.push(newContact);
            users.push(newUser);
        }
        await roomsCollection.insertMany(rooms);
        await contactsCollection.insertMany(contacts);
        await usersCollection.insertMany(users);
        console.log(await Room.find({}, { _id: 1 }))

        console.log("Database seeded! :)");
        client.close();
    } catch (err) {
        console.log(err);
    }
}

function createBooking(): BookingData {
    const randomNum = Math.floor(Math.random() * 10)
    return {
        order_date: new Date(faker.date.anytime()).getTime().toString(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        check_in: new Date(faker.date.anytime()).getTime().toString(),
        check_out: new Date(faker.date.anytime()).getTime().toString(),
        request: faker.lorem.sentence(20),
        room: roomsId[randomNum]._id,
        status: faker.helpers.arrayElement(['In Progress', 'Check Out', 'Check In'])
    };
}

export async function seedBookings(database: string) {
    await mongoose.connect(database === 'test' ? process.env.MONGODB_URI_TEST! : process.env.MONGODB_URI!)
    const client = mongoose.connection.getClient()
    try {
        const bookingsCollection = client.db(database).collection("bookings");
        await bookingsCollection.drop();
        const bookings = [];
        for (let i = 0; i < 10; i++) {
            const newBooking = createBooking()
            bookings.push(newBooking);
        }
        await bookingsCollection.insertMany(bookings);
        console.log("Bookings Collection seeded! :)");
        client.close();
    } catch (err) {
        console.log(err);
    }
}

// seedDB('mirandaDB')
// seedBookings('mirandaDB')
// seedDB('test')
seedBookings('test')