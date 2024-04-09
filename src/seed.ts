import { faker } from '@faker-js/faker';
import mongoose from 'mongoose'
import bcrypt from "bcryptjs";
import { UserData } from './interfaces/User';
import { ContactData } from './interfaces/Contact';
import { RoomData } from './interfaces/Room';
import { BookingData } from './interfaces/Booking';

function createBooking(): BookingData {
    return {
        order_date: new Date(faker.date.anytime()).getTime().toString(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        check_in: new Date(faker.date.anytime()).getTime().toString(),
        check_out: new Date(faker.date.anytime()).getTime().toString(),
        request: faker.lorem.sentence(20),
        room_type: faker.helpers.arrayElement(['Single Bed', 'Double Bed', 'Double Superior', 'Suite']),
        room_number: faker.helpers.rangeToNumber({ min: 1, max: 100 }).toString(),
        status: faker.helpers.arrayElement(['In Progress', 'Check Out', 'Check In'])
    };
}
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
        password: bcrypt.hashSync(raw_password, 10),
    }
    console.log(`${newUser.email}: ${raw_password}`)
    return newUser
}

export async function seedDB() {
    const client = mongoose.connection.getClient()
    try {
        const bookingsCollection = client.db("mirandaDB").collection("bookings");
        const roomsCollection = client.db("mirandaDB").collection("rooms");
        const contactsCollection = client.db("mirandaDB").collection("contacts");
        const usersCollection = client.db("mirandaDB").collection("users");

        await bookingsCollection.drop();
        await roomsCollection.drop();
        await contactsCollection.drop();
        await usersCollection.drop();

        const bookings = [];
        const rooms = [];
        const contacts = [];
        const users = [];

        for (let i = 0; i < 10; i++) {
            const newBooking = createBooking()
            const newRoom = createRoom()
            const newContact = createContact()
            const newUser = createUser()

            bookings.push(newBooking);
            rooms.push(newRoom);
            contacts.push(newContact);
            users.push(newUser);
        }
        await roomsCollection.insertMany(rooms);
        await contactsCollection.insertMany(contacts);
        await usersCollection.insertMany(users);
        await bookingsCollection.insertMany(bookings);

        console.log("Database seeded! :)");
        client.close();
    } catch (err) {
        console.log(err);
    }
}
seedDB()