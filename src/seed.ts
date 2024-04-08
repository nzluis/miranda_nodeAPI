import { faker } from '@faker-js/faker';
import mongoose from 'mongoose'

export async function seedDB() {
    const client = mongoose.connection.getClient()
    try {
        const collection = client.db("mirandaDB").collection("bookings");

        collection.drop();

        const bookings = [];

        for (let i = 0; i < 10; i++) {
            const newBooking = {
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

            bookings.push(newBooking);
        }
        collection.insertMany(bookings);

        console.log("Database seeded! :)");
        client.close();
    } catch (err) {
        console.log(err);
    }
}
