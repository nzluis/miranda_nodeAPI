import { describe, expect, test } from '@jest/globals';
import request from 'supertest'
import { app } from './src/app'

const token = `Bearer ${process.env.TOKEN}`
const wrongToken = 'Bearer M-wtz4wcyNQdgAT96na!V8YD0bQ=vqhfcaBE78ByXwzzKzSeR3/v50wbz--WB==4zppag?/Y5n8Zuq8rB84po8ijNJEXir7gnpVYI8mawLE!6VpSAUYJFOyZ-0eSSDayXlU5OVP4gWlN=NnrHzFW?Pxd6YsRx9cSh-oxOdyfncxOT8nnRW2IfrxkulJGpOkikD1H8Hq64qrUcSA6WoUAFlANVz00NXJQl-=k5x2QHF4uEvY57w6pGH9z?xE=kXj7'

describe('Bookings Tests', () => {
  test('GET /bookings without token should get an 401 status', async () => {
    const res = await request(app)
      .get('/bookings')
    expect(res.statusCode).toEqual(401)
  })
  test('GET /bookings with CORRECT token should get an 200 status', async () => {
    const res = await request(app)
      .get('/bookings')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200)
  })
  test('GET /bookings with WRONG token should get a 200 status', async () => {
    const res = await request(app)
      .get('/bookings')
      .set('Authorization', wrongToken)
    expect(res.statusCode).toEqual(403)
  })
  test('GET /bookings has a response body length of 40 [devMode]', async () => {
    const res = await request(app)
      .get('/bookings')
      .set('Authorization', token)
    expect(res.body).toHaveLength(40)
  })
  test('GET /bookings/{wrong id} should return 404 "Booking ID not found"', async () => {
    const res = await request(app)
      .get('/bookings/XXXXX')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe(true)
    expect(res.body.message).toEqual('Booking ID not found');
  })
  test('GET /bookings/{specific id} has a First Name of Ramson [devMode] ', async () => {
    const res = await request(app)
      .get('/bookings/db05ffe5-3762-4756-9c43-ba48bc4dc6ae')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ first_name: 'Ransom' }));
  })
  test('POST /bookings/create successfully', async () => {
    const res = await request(app)
      .post('/bookings/create')
      .send({
        "id": "testingId",
        "order_date": "1702700390000",
        "first_name": "Test",
        "last_name": "Name",
        "check_in": "1716722298000",
        "check_out": "1720229350000",
        "request": "Donec semper sapien a libero. Nam dui.",
        "room_type": "Suite",
        "room_number": "999",
        "status": "Check In"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ first_name: 'Test' }));
  })
  test('POST /bookings/create with ID already exists', async () => {
    const res = await request(app)
      .post('/bookings/create')
      .send({
        "id": "db05ffe5-3762-4756-9c43-ba48bc4dc6ae",
        "order_date": "1702700390000",
        "first_name": "Test",
        "last_name": "Name",
        "check_in": "1716722298000",
        "check_out": "1720229350000",
        "request": "Donec semper sapien a libero. Nam dui.",
        "room_type": "Suite",
        "room_number": "999",
        "status": "Check In"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(409);
  })
  test('PUT /booking/{id}/update successfully', async () => {
    const res = await request(app)
      .put('/bookings/testingId/update')
      .send({
        "id": "testingId",
        "order_date": "1702700390000",
        "first_name": "Test MODIFIED",
        "last_name": "Name",
        "check_in": "1716722298000",
        "check_out": "1720229350000",
        "request": "Donec semper sapien a libero. Nam dui.",
        "room_type": "Single Bed",
        "room_number": "000",
        "status": "Check Out"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ first_name: 'Test MODIFIED' }));

  })
  test('PUT /booking/{wrongId}/update should return a 404 "Booking not found"', async () => {
    const res = await request(app)
      .put('/bookings/testingWrongId/update')
      .send({
        "id": "testingWrongId",
        "order_date": "1702700390000",
        "first_name": "Test MODIFIED",
        "last_name": "Name",
        "check_in": "1716722298000",
        "check_out": "1720229350000",
        "request": "Donec semper sapien a libero. Nam dui.",
        "room_type": "Single Bed",
        "room_number": "000",
        "status": "Check Out"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe(true)
    expect(res.body.message).toEqual('Booking ID not found');
  })
  test('DELETE /booking/testingId/delete successfully', async () => {
    const res = await request(app)
      .delete('/bookings/testingId/delete')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ id: 'testingId' }));
  })
  test('DELETE /booking/testingWrongId/delete should return a 404 "Booking ID not found"', async () => {
    const res = await request(app)
      .delete('/bookings/testingWrongID/delete')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe(true)
    expect(res.body.message).toEqual('Booking ID not found');
  })
})


describe('Rooms Tests', () => {
  test('GET /rooms without token should get an 401 status', async () => {
    const res = await request(app)
      .get('/rooms')
    expect(res.statusCode).toEqual(401)
  })
  test('GET /rooms with CORRECT token should get an 200 status', async () => {
    const res = await request(app)
      .get('/rooms')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200)
  })
  test('GET /rooms with WRONG token should get a 200 status', async () => {
    const res = await request(app)
      .get('/rooms')
      .set('Authorization', wrongToken)
    expect(res.statusCode).toEqual(403)
  })
  test('GET /rooms has a response body length of 40 [devMode]', async () => {
    const res = await request(app)
      .get('/rooms')
      .set('Authorization', token)
    expect(res.body).toHaveLength(40)
  })
  test('GET /rooms/{wrong id} should return 404 "Room ID not found"', async () => {
    const res = await request(app)
      .get('/rooms/XXXXX')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe(true)
    expect(res.body.message).toEqual('Room ID not found');
  })
  test('GET /room/{specific id} has a room number 733  [devMode] ', async () => {
    const res = await request(app)
      .get('/rooms/5584882e-08fd-443a-8e61-a89cb937879e')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ room_number: '733' }));
  })
  test('POST /rooms/create successfully', async () => {
    const res = await request(app)
      .post('/rooms/create')
      .send({
        "id": "testingId",
        "photo": "https://robohash.org/temporautexpedita.png?size=100x50&set=set1",
        "room_number": "001",
        "room_type": "Suite",
        "description": "Test",
        "offer": true,
        "price": "999",
        "discount": "99",
        "cancelation": "No",
        "amenities": [
          "AC",
          "Shower",
          "Comfort Bed",
          "Towel",
          "Bathup",
          "Coffee Set",
          "LEDTV",
          "Wifi"
        ],
        "status": "Booked"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ description: 'Test' }));
  })
  test('POST /rooms/create with ID already exists', async () => {
    const res = await request(app)
      .post('/rooms/create')
      .send({
        "id": "6b9242fd-d25f-40b2-b3e3-ce0bef218e6c",
        "photo": "https://robohash.org/officiaofficiisquia.png?size=100x50&set=set1",
        "room_number": "560",
        "room_type": "Double Bed",
        "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.",
        "offer": false,
        "price": "400",
        "discount": "82",
        "cancelation": "Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.",
        "amenities": [
          "AC",
          "Shower",
          "Comfort Bed",
          "Towel",
          "Bathup",
          "Coffee Set",
          "LEDTV",
          "Wifi"
        ],
        "status": "Booked"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(409);
  })
  test('PUT /rooms/{id}/update successfully', async () => {
    const res = await request(app)
      .put('/rooms/testingId/update')
      .send({
        "id": "testingId",
        "photo": "https://robohash.org/temporautexpedita.png?size=100x50&set=set1",
        "room_number": "001",
        "room_type": "Suite",
        "description": "Test MODIFIED",
        "offer": true,
        "price": "999",
        "discount": "99",
        "cancelation": "No",
        "amenities": [
          "AC",
          "Shower",
          "Comfort Bed",
          "Towel",
          "Bathup",
          "Coffee Set",
          "LEDTV",
          "Wifi"
        ],
        "status": "Booked"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ description: 'Test MODIFIED' }));

  })
  test('PUT /room/{wrongId}/update should return a 404 "Room not found"', async () => {
    const res = await request(app)
      .put('/rooms/testingWrongId/update')
      .send({
        "id": "testingWrongId",
        "photo": "https://robohash.org/temporautexpedita.png?size=100x50&set=set1",
        "room_number": "001",
        "room_type": "Suite",
        "description": "Test",
        "offer": true,
        "price": "999",
        "discount": "99",
        "cancelation": "No",
        "amenities": [
          "AC",
          "Shower",
          "Comfort Bed",
          "Towel",
          "Bathup",
          "Coffee Set",
          "LEDTV",
          "Wifi"
        ],
        "status": "Booked"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe(true)
    expect(res.body.message).toEqual('Room ID not found');
  })
  test('DELETE /room/testingId/delete successfully', async () => {
    const res = await request(app)
      .delete('/rooms/testingId/delete')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ id: 'testingId' }));
  })
  test('DELETE /room/testingWrongId/delete should return a 404 "Room ID not found"', async () => {
    const res = await request(app)
      .delete('/rooms/testingWrongId/delete')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe(true)
    expect(res.body.message).toEqual('Room ID not found');
  })
})

describe('Contacts Tests', () => {
  test('GET /contacts without token should get an 401 status', async () => {
    const res = await request(app)
      .get('/contacts')
    expect(res.statusCode).toEqual(401)
  })
  test('GET /contacts with CORRECT token should get an 200 status', async () => {
    const res = await request(app)
      .get('/contacts')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200)
  })
  test('GET /contacts with WRONG token should get a 200 status', async () => {
    const res = await request(app)
      .get('/contacts')
      .set('Authorization', wrongToken)
    expect(res.statusCode).toEqual(403)
  })
  test('GET /contacts has a response body length of 40 [devMode]', async () => {
    const res = await request(app)
      .get('/contacts')
      .set('Authorization', token)
    expect(res.body).toHaveLength(40)
  })
  test('GET /contacts/{wrong id} should return 404 "Contact ID not found"', async () => {
    const res = await request(app)
      .get('/contacts/XXXXX')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe(true)
    expect(res.body.message).toEqual('Contact ID not found');
  })
  test('GET /contact/{specific id} has a contact name "Haze Polycote"  [devMode] ', async () => {
    const res = await request(app)
      .get('/contacts/22')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ full_name: 'Haze Polycote' }));
  })
  test('POST /contacts/create successfully', async () => {
    const res = await request(app)
      .post('/contacts/create')
      .send({
        "id": 9999,
        "full_name": "Test Name",
        "email": "example@example.org",
        "phone": "(000) 0000000",
        "subject": "None",
        "message": "empty",
        "status": "Unread",
        "date": "1708040860000"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ full_name: 'Test Name' }));
  })
  test('POST /contacts/create with ID already exists', async () => {
    const res = await request(app)
      .post('/contacts/create')
      .send({
        "id": 22,
        "full_name": "Haze Polycote",
        "email": "hpolycotel@apache.org",
        "phone": "(515) 4178936",
        "subject": "nulla",
        "message": "Sed accumsan felis. Ut at dolor quis odio consequat varius.",
        "status": "Unread",
        "date": "1708040860000"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(409);
  })
  test('PUT /contacts/{id}/update successfully', async () => {
    const res = await request(app)
      .put('/contacts/9999/update')
      .send({
        "id": 9999,
        "full_name": "Test Name MODIFIED",
        "email": "example@example.org",
        "phone": "(000) 0000000",
        "subject": "None",
        "message": "empty",
        "status": "Unread",
        "date": "1708040860000"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ full_name: 'Test Name MODIFIED' }));

  })
  test('PUT /contact/{wrongId}/update should return a 404 "Contact not found"', async () => {
    const res = await request(app)
      .put('/contacts/1111/update')
      .send({
        "id": 1111,
        "full_name": "Failed Test",
        "email": "example@example.org",
        "phone": "(000) 0000000",
        "subject": "None",
        "message": "empty",
        "status": "Unread",
        "date": "1708040860000"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe(true)
    expect(res.body.message).toEqual('Contact ID not found');
  })
  test('DELETE /contact/testingId/delete successfully', async () => {
    const res = await request(app)
      .delete('/contacts/9999/delete')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ id: 9999 }));
  })
  test('DELETE /contact/testingWrongId/delete should return a 404 "Contact ID not found"', async () => {
    const res = await request(app)
      .delete('/contacts/1111/delete')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe(true)
    expect(res.body.message).toEqual('Contact ID not found');
  })
})

describe('Users Tests', () => {
  test('GET /users without token should get an 401 status', async () => {
    const res = await request(app)
      .get('/users')
    expect(res.statusCode).toEqual(401)
  })
  test('GET /users with CORRECT token should get an 200 status', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200)
  })
  test('GET /users with WRONG token should get a 200 status', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', wrongToken)
    expect(res.statusCode).toEqual(403)
  })
  test('GET /users has a response body length of 20 [devMode]', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', token)
    expect(res.body).toHaveLength(20)
  })
  test('GET /users/{wrong id} should return 404 "User ID not found"', async () => {
    const res = await request(app)
      .get('/users/XXXXX')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe(true)
    expect(res.body.message).toEqual('User ID not found');
  })
  test('GET /user/{specific id} has a user name "Brande Strauss"  [devMode] ', async () => {
    const res = await request(app)
      .get('/users/b397d8b2-20d5-4597-a070-78e635ef2595')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ full_name: 'Brande Strauss' }));
  })
  test('POST /users/create successfully', async () => {
    const res = await request(app)
      .post('/users/create')
      .send({
        "id": "testingId",
        "photo": "https://robohash.org/enimquibusdamvel.png?size=100x100&set=set1",
        "full_name": "Test Name",
        "email": "example@example.com",
        "start_date": "1652288732000",
        "description": "empty",
        "position": "Room Service",
        "phone": "(000) 00000000",
        "status": "Active",
        "password": "$2a$04$rETqhIGX85hrWgXgEzybXOpEWGeeYHAO93RsBLgg87b8DC5td7ss."
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ full_name: 'Test Name' }));
  })
  test('POST /users/create with ID already exists', async () => {
    const res = await request(app)
      .post('/users/create')
      .send({
        "id": "b397d8b2-20d5-4597-a070-78e635ef2595",
        "photo": "https://robohash.org/enimquibusdamvel.png?size=100x100&set=set1",
        "full_name": "Brande Strauss",
        "email": "bstrauss3@vinaora.com",
        "start_date": "1652288732000",
        "description": "Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
        "position": "Room Service",
        "phone": "(299) 6249631",
        "status": "Active",
        "password": "$2a$04$rETqhIGX85hrWgXgEzybXOpEWGeeYHAO93RsBLgg87b8DC5td7ss."
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(409);
  })
  test('PUT /users/{id}/update successfully', async () => {
    const res = await request(app)
      .put('/users/testingId/update')
      .send({
        "id": "testingId",
        "photo": "https://robohash.org/enimquibusdamvel.png?size=100x100&set=set1",
        "full_name": "Test Name MODIFIED",
        "email": "example@example.com",
        "start_date": "1652288732000",
        "description": "empty",
        "position": "Room Service",
        "phone": "(000) 00000000",
        "status": "Active",
        "password": "$2a$04$rETqhIGX85hrWgXgEzybXOpEWGeeYHAO93RsBLgg87b8DC5td7ss."
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ full_name: 'Test Name MODIFIED' }));

  })
  test('PUT /user/{wrongId}/update should return a 404 "User not found"', async () => {
    const res = await request(app)
      .put('/users/testingWrongId/update')
      .send({
        "id": "testingWrongId",
        "photo": "https://robohash.org/enimquibusdamvel.png?size=100x100&set=set1",
        "full_name": "Test Name",
        "email": "example@example.com",
        "start_date": "1652288732000",
        "description": "empty",
        "position": "Room Service",
        "phone": "(000) 00000000",
        "status": "Active",
        "password": "$2a$04$rETqhIGX85hrWgXgEzybXOpEWGeeYHAO93RsBLgg87b8DC5td7ss."
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe(true)
    expect(res.body.message).toEqual('User ID not found');
  })
  test('DELETE /user/testingId/delete successfully', async () => {
    const res = await request(app)
      .delete('/users/testingId/delete')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ id: 'testingId' }));
  })
  test('DELETE /user/testingWrongId/delete should return a 404 "User ID not found"', async () => {
    const res = await request(app)
      .delete('/users/testingWrongId/delete')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe(true)
    expect(res.body.message).toEqual('User ID not found');
  })
})
