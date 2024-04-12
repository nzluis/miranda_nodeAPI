import { describe, expect, test, afterAll, beforeAll } from '@jest/globals';
import request from 'supertest'
import { app } from './src/app'
import { Booking } from './src/models/Booking';
import mongoose from 'mongoose'
import { Contact } from './src/models/Contact';
import { Room } from './src/models/Room';
import { User } from './src/models/User';

const token = `Bearer ${process.env.TOKEN}`
const wrongToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IklsYTgyQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIzMV9RR2x5ZlNkcVdqY0oifQ.gp_4i1BK_UzKiKDro9AKb0PNt98mKX3zqI8DV_0HcI0'

beforeAll(async () => {
  await mongoose.connection.close()
  await mongoose.connect(process.env.MONGODB_URI_TEST!)
    .then(() => {
      console.log('Connected to TESTdb')
    })
    .catch(() => {
      console.log('Error connecting TESTdb')
    })
})
afterAll(done => {
  mongoose.connection.close()
  done()
})

describe('Bookings Tests', () => {
  const id = '6617bcf9d99250888cf888d1'
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
  test('GET /bookings with WRONG token should get a 403 status', async () => {
    const res = await request(app)
      .get('/bookings')
      .set('Authorization', wrongToken)
    expect(res.statusCode).toEqual(403)
    expect(res.body.error.message).toContain('Token is not correct')
  })
  test('GET /bookings has a response body length of 10 [devMode]', async () => {
    const res = await request(app)
      .get('/bookings')
      .set('Authorization', token)
    expect(res.body).toHaveLength(10)
  })
  test('GET /bookings/{invalid id} should return 400 "CastError: Invalid id"', async () => {
    const res = await request(app)
      .get('/bookings/xxxxx')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('Invalid _id');
  })
  test('GET /bookings/{wrong id} should return 404 "Booking ID not found"', async () => {
    const res = await request(app)
      .get(`/bookings/${id}`)
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.error.message).toEqual('Booking Id Not Found');
  })
  test('GET /bookings/{specific id} has a First Name of Adolph [devMode] ', async () => {
    const res = await request(app)
      .get('/bookings/6617bcf9d99250888cf888d4')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ first_name: 'Adolph' }));
  })
  test('POST /bookings/create without last name return a Validation Error', async () => {
    const res = await request(app)
      .post('/bookings/create')
      .send({
        "_id": `${id}`,
        "order_date": "1743443405547",
        "first_name": "TEST NAME",
        "check_in": "1690046609173",
        "check_out": "1697281799398",
        "request": "Vinum angustus derelinquo officiis commodo desidero solvo defessus tutamen iure sunt itaque aedificium cito caries amissio tricesimus consectetur cui curis.",
        "room": {
          "_id": "6617bcdc9e179f98f0c98977",
          "photo": "https://picsum.photos/100/50",
          "room_number": "80",
          "room_type": "Suite",
          "description": "Aegre capitulus deprecator aufero tenetur animus vita balbus demergo aetas convoco debilito pariatur depraedor claudeo alius crapula thema verbum corroboro victoria auditor comis thermae demum.",
          "offer": false,
          "price": "205",
          "discount": "36",
          "cancelation": "Tempore synagoga thesis amaritudo porro currus consequatur accendo adeo consectetur vox custodia depopulo mollitia ascisco.",
          "amenities": [
            "AC",
            "Jacuzzi",
            "King Size Bed",
            "60\" TV",
            "Wifi"
          ],
          "status": "Available"
        },
        "status": "In Progress"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('Last name is necessary');
  })
  test('POST /bookings/create successfully', async () => {
    const res = await request(app)
      .post('/bookings/create')
      .send({
        "_id": `${id}`,
        "order_date": "1743443405547",
        "first_name": "TEST NAME",
        "last_name": "TEST LASTNAME",
        "check_in": "1690046609173",
        "check_out": "1697281799398",
        "request": "Vinum angustus derelinquo officiis commodo desidero solvo defessus tutamen iure sunt itaque aedificium cito caries amissio tricesimus consectetur cui curis.",
        "room": {
          "_id": "6617bcdc9e179f98f0c98977",
          "photo": "https://picsum.photos/100/50",
          "room_number": "80",
          "room_type": "Suite",
          "description": "Aegre capitulus deprecator aufero tenetur animus vita balbus demergo aetas convoco debilito pariatur depraedor claudeo alius crapula thema verbum corroboro victoria auditor comis thermae demum.",
          "offer": false,
          "price": "205",
          "discount": "36",
          "cancelation": "Tempore synagoga thesis amaritudo porro currus consequatur accendo adeo consectetur vox custodia depopulo mollitia ascisco.",
          "amenities": [
            "AC",
            "Jacuzzi",
            "King Size Bed",
            "60\" TV",
            "Wifi"
          ],
          "status": "Available"
        },
        "status": "In Progress"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ first_name: 'TEST NAME' }));
  })
  test('GET recent created booking should return 200 first_name as TEST NAME', async () => {
    const res = await request(app)
      .get(`/bookings/${id}`)
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ first_name: 'TEST NAME' }));
  })
  test('POST /bookings/create with ID already exists', async () => {
    const res = await request(app)
      .post('/bookings/create')
      .send({
        "_id": `${id}`,
        "order_date": "1743443405547",
        "first_name": "TEST NAME",
        "last_name": "TEST LASTNAME",
        "check_in": "1690046609173",
        "check_out": "1697281799398",
        "request": "Vinum angustus derelinquo officiis commodo desidero solvo defessus tutamen iure sunt itaque aedificium cito caries amissio tricesimus consectetur cui curis.",
        "room": {
          "_id": "6617bcdc9e179f98f0c98977",
          "photo": "https://picsum.photos/100/50",
          "room_number": "80",
          "room_type": "Suite",
          "description": "Aegre capitulus deprecator aufero tenetur animus vita balbus demergo aetas convoco debilito pariatur depraedor claudeo alius crapula thema verbum corroboro victoria auditor comis thermae demum.",
          "offer": false,
          "price": "205",
          "discount": "36",
          "cancelation": "Tempore synagoga thesis amaritudo porro currus consequatur accendo adeo consectetur vox custodia depopulo mollitia ascisco.",
          "amenities": [
            "AC",
            "Jacuzzi",
            "King Size Bed",
            "60\" TV",
            "Wifi"
          ],
          "status": "Available"
        },
        "status": "In Progress"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('already exist. please use another')

  })
  test('PUT /booking/{id}/update successfully', async () => {
    const bookingExist = await Booking.findOne({ first_name: 'TEST NAME' })
    const res = await request(app)
      .put(`/bookings/${bookingExist!._id}/update`)
      .send({
        "order_date": "1743443405547",
        "first_name": "TEST NAME MODIFIED",
        "last_name": "TEST LASTNAME",
        "check_in": "1690046609173",
        "check_out": "1697281799398",
        "request": "Vinum angustus derelinquo officiis commodo desidero solvo defessus tutamen iure sunt itaque aedificium cito caries amissio tricesimus consectetur cui curis.",
        "room": {
          "_id": "6617bcdc9e179f98f0c98977",
          "photo": "https://picsum.photos/100/50",
          "room_number": "80",
          "room_type": "Suite",
          "description": "Aegre capitulus deprecator aufero tenetur animus vita balbus demergo aetas convoco debilito pariatur depraedor claudeo alius crapula thema verbum corroboro victoria auditor comis thermae demum.",
          "offer": false,
          "price": "205",
          "discount": "36",
          "cancelation": "Tempore synagoga thesis amaritudo porro currus consequatur accendo adeo consectetur vox custodia depopulo mollitia ascisco.",
          "amenities": [
            "AC",
            "Jacuzzi",
            "King Size Bed",
            "60\" TV",
            "Wifi"
          ],
          "status": "Available"
        },
        "status": "In Progress"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    const bookingAfterEdit = await Booking.findOne({ _id: bookingExist!._id })
    expect(bookingAfterEdit).toEqual(expect.objectContaining({ first_name: 'TEST NAME MODIFIED' }));

  })
  test('DELETE /booking/{id}/delete successfully', async () => {
    const bookingExist = await Booking.findOne({ first_name: 'TEST NAME MODIFIED' })
    const res = await request(app)
      .delete(`/bookings/${bookingExist!._id}/delete`)
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({}));
    const bookingAfterEdit = await Booking.findOne({ first_name: 'TEST NAME MODIFIED' })
    expect(bookingAfterEdit).toEqual(expect.objectContaining({}));
  })
  test('PUT /booking/{wrongId}/update should return a 404 "Booking not found"', async () => {
    const res = await request(app)
      .put(`/bookings/${id}/update`)
      .send({
        "order_date": "1702700390000",
        "first_name": "Test MODIFIED",
        "last_name": "Name",
        "check_in": "1716722298000",
        "check_out": "1720229350000",
        "request": "Donec semper sapien a libero. Nam dui.",
        "status": "Check Out"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Booking Id Not Found');
  })
  test('DELETE /booking/testingWrongId/delete should return a 404 "Booking ID not found"', async () => {
    const res = await request(app)
      .delete(`/bookings/${id}/delete`)
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.status).toBe('fail')
    expect(res.body.message).toEqual('Booking Id Not Found');
  })
})





describe('Contacts Tests', () => {
  const id = '6617bcf9d99250888cf888d1'
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
  test('GET /contacts with WRONG token should get a 403 status', async () => {
    const res = await request(app)
      .get('/contacts')
      .set('Authorization', wrongToken)
    expect(res.statusCode).toEqual(403)
    expect(res.body.error.message).toContain('Token is not correct')
  })
  test('GET /contacts has a response body length of 10 [devMode]', async () => {
    const res = await request(app)
      .get('/contacts')
      .set('Authorization', token)
    expect(res.body).toHaveLength(10)
  })
  test('GET /contacts/{invalid id} should return 400 "CastError: Invalid id"', async () => {
    const res = await request(app)
      .get('/contacts/xxxxx')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('Invalid _id');
  })
  test('GET /contacts/{wrong id} should return 404 "Contact ID not found"', async () => {
    const res = await request(app)
      .get(`/contacts/${id}`)
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.error.message).toEqual('Contact Id Not Found');
  })
  test('GET /contacts/{specific id} has a email of Doug70@gmail.com [devMode] ', async () => {
    const res = await request(app)
      .get('/contacts/6617bcdc9e179f98f0c9897d')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ email: 'Doug70@gmail.com' }));
  })
  test('POST /contacts/create without email return a Validation Error', async () => {
    const res = await request(app)
      .post('/contacts/create')
      .send({
        "_id": "6617bcdc9e179f98f0c9897d",
        "full_name": "Horace Thompson-Stiedemann DDS",
        "phone": "204.351.6660",
        "subject": "secede solidly",
        "message": "Adinventitias communis nisi admoveo cursus vespillo charisma copiose iste viridis vacuus cimentarius aer tibi vel tepidus aeternus inflammatio vulgivagus antepono anser cui uberrime conspergo capio conturbo.",
        "status": "Read",
        "date": "1712831707331"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('Email is necessary');
  })
  test('POST /contacts/create successfully', async () => {
    const res = await request(app)
      .post('/contacts/create')
      .send({
        "_id": `${id}`,
        "full_name": "TEST NAME",
        "email": "testname@gmail.com",
        "phone": "204.351.6660",
        "subject": "secede solidly",
        "message": "Adinventitias communis nisi admoveo cursus vespillo charisma copiose iste viridis vacuus cimentarius aer tibi vel tepidus aeternus inflammatio vulgivagus antepono anser cui uberrime conspergo capio conturbo.",
        "status": "Read",
        "date": "1712831707331"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ full_name: 'TEST NAME' }));
  })
  test('GET recent created contact should return 200 first_name as TEST NAME', async () => {
    const res = await request(app)
      .get(`/contacts/${id}`)
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ full_name: 'TEST NAME' }));
  })
  test('POST /contacts/create with ID already exists', async () => {
    const res = await request(app)
      .post('/contacts/create')
      .send({
        "_id": `${id}`,
        "full_name": "TEST NAME",
        "email": "testname@gmail.com",
        "phone": "204.351.6660",
        "subject": "secede solidly",
        "message": "Adinventitias communis nisi admoveo cursus vespillo charisma copiose iste viridis vacuus cimentarius aer tibi vel tepidus aeternus inflammatio vulgivagus antepono anser cui uberrime conspergo capio conturbo.",
        "status": "Read",
        "date": "1712831707331"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('already exist. please use another')

  })
  test('PUT /contact/{id}/update successfully', async () => {
    const contactExist = await Contact.findOne({ full_name: 'TEST NAME' })
    const res = await request(app)
      .put(`/contacts/${contactExist!._id}/update`)
      .send({
        "_id": `${id}`,
        "full_name": "TEST NAME MODIFIED",
        "email": "testname@gmail.com",
        "phone": "204.351.6660",
        "subject": "secede solidly",
        "message": "Adinventitias communis nisi admoveo cursus vespillo charisma copiose iste viridis vacuus cimentarius aer tibi vel tepidus aeternus inflammatio vulgivagus antepono anser cui uberrime conspergo capio conturbo.",
        "status": "Read",
        "date": "1712831707331"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    const contactAfterEdit = await Contact.findOne({ _id: contactExist!._id })
    expect(contactAfterEdit).toEqual(expect.objectContaining({ full_name: 'TEST NAME MODIFIED' }));

  })
  test('DELETE /contact/{id}/delete successfully', async () => {
    const contactExist = await Contact.findOne({ full_name: 'TEST NAME MODIFIED' })
    const res = await request(app)
      .delete(`/contacts/${contactExist!._id}/delete`)
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({}));
    const contactAfterEdit = await Contact.findOne({ full_name: 'TEST NAME MODIFIED' })
    expect(contactAfterEdit).toEqual(expect.objectContaining({}));
  })
  test('PUT /contact/{wrongId}/update should return a 404 "Contact not found"', async () => {
    const res = await request(app)
      .put(`/contacts/${id}/update`)
      .send({
        "_id": `${id}`,
        "full_name": "TEST NAME MODIFIED",
        "email": "testname@gmail.com",
        "phone": "204.351.6660",
        "subject": "secede solidly",
        "message": "Adinventitias communis nisi admoveo cursus vespillo charisma copiose iste viridis vacuus cimentarius aer tibi vel tepidus aeternus inflammatio vulgivagus antepono anser cui uberrime conspergo capio conturbo.",
        "status": "Read",
        "date": "1712831707331"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Contact Id Not Found');
  })
  test('DELETE /contact/testingWrongId/delete should return a 404 "Contact ID not found"', async () => {
    const res = await request(app)
      .delete(`/contacts/${id}/delete`)
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.status).toBe('fail')
    expect(res.body.message).toEqual('Contact Id Not Found');
  })
})










describe('Rooms Tests', () => {
  const id = '6617bcf9d99250888cf888d1'
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
  test('GET /rooms with WRONG token should get a 403 status', async () => {
    const res = await request(app)
      .get('/rooms')
      .set('Authorization', wrongToken)
    expect(res.statusCode).toEqual(403)
    expect(res.body.error.message).toContain('Token is not correct')
  })
  test('GET /rooms has a response body length of 10 [devMode]', async () => {
    const res = await request(app)
      .get('/rooms')
      .set('Authorization', token)
    expect(res.body).toHaveLength(10)
  })
  test('GET /rooms/{invalid id} should return 400 "CastError: Invalid id"', async () => {
    const res = await request(app)
      .get('/rooms/xxxxx')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('Invalid _id');
  })
  test('GET /rooms/{wrong id} should return 404 "Room ID not found"', async () => {
    const res = await request(app)
      .get(`/rooms/${id}`)
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.error.message).toEqual('Room Id Not Found');
  })
  test('GET /rooms/{specific id} has a room number of 50 [devMode] ', async () => {
    const res = await request(app)
      .get('/rooms/6617bcdc9e179f98f0c98973')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ room_number: '50' }));
  })
  test('POST /rooms/create without room number return a Validation Error', async () => {
    const res = await request(app)
      .post('/rooms/create')
      .send({
        "_id": "6617bcdc9e179f98f0c98973",
        "photo": "https://picsum.photos/100/50",
        "room_type": "Double Superior",
        "description": "Conventus deludo defendo vinitor cetera tantillus tamisium varietas spiculum suadeo consuasor tactus utpote antea corroboro verbera tepidus aequitas circumvenio consequatur aetas hic victus supellex curto.",
        "offer": false,
        "price": "151",
        "discount": "34",
        "cancelation": "Explicabo apto aggredior urbanus sortitus natus alias cuius saepe apparatus aveho temptatio adfectus tutis volup.",
        "amenities": [
          "AC",
          "Jacuzzi",
          "King Size Bed",
          "60\" TV",
          "Wifi"
        ],
        "status": "Booked"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('Room number is necessary');
  })
  test('POST /rooms/create successfully', async () => {
    const res = await request(app)
      .post('/rooms/create')
      .send({
        "_id": `${id}`,
        "photo": "https://picsum.photos/100/50",
        "room_number": "999",
        "room_type": "Suite",
        "description": "Conventus deludo defendo vinitor cetera tantillus tamisium varietas spiculum suadeo consuasor tactus utpote antea corroboro verbera tepidus aequitas circumvenio consequatur aetas hic victus supellex curto.",
        "offer": false,
        "price": "555",
        "discount": "0",
        "cancelation": "Explicabo apto aggredior urbanus sortitus natus alias cuius saepe apparatus aveho temptatio adfectus tutis volup.",
        "amenities": [
          "AC",
          "Jacuzzi",
          "King Size Bed",
          "60\" TV",
          "Wifi"
        ],
        "status": "Booked"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ room_number: '999' }));
  })
  test('GET recent created room should return 200 room_number as 999', async () => {
    const res = await request(app)
      .get(`/rooms/${id}`)
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ room_number: '999' }));
  })
  test('POST /rooms/create with ID already exists', async () => {
    const res = await request(app)
      .post('/rooms/create')
      .send({
        "_id": `${id}`,
        "photo": "https://picsum.photos/100/50",
        "room_number": "999",
        "room_type": "Suite",
        "description": "Conventus deludo defendo vinitor cetera tantillus tamisium varietas spiculum suadeo consuasor tactus utpote antea corroboro verbera tepidus aequitas circumvenio consequatur aetas hic victus supellex curto.",
        "offer": false,
        "price": "555",
        "discount": "0",
        "cancelation": "Explicabo apto aggredior urbanus sortitus natus alias cuius saepe apparatus aveho temptatio adfectus tutis volup.",
        "amenities": [
          "AC",
          "Jacuzzi",
          "King Size Bed",
          "60\" TV",
          "Wifi"
        ],
        "status": "Booked"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('already exist. please use another')

  })
  test('PUT /room/{id}/update successfully', async () => {
    const roomExist = await Room.findOne({ room_number: '999' })
    const res = await request(app)
      .put(`/rooms/${roomExist!._id}/update`)
      .send({
        "photo": "https://picsum.photos/100/50",
        "room_number": "777",
        "room_type": "Suite",
        "description": "Conventus deludo defendo vinitor cetera tantillus tamisium varietas spiculum suadeo consuasor tactus utpote antea corroboro verbera tepidus aequitas circumvenio consequatur aetas hic victus supellex curto.",
        "offer": false,
        "price": "555",
        "discount": "0",
        "cancelation": "Explicabo apto aggredior urbanus sortitus natus alias cuius saepe apparatus aveho temptatio adfectus tutis volup.",
        "amenities": [
          "AC",
          "Jacuzzi",
          "King Size Bed",
          "60\" TV",
          "Wifi"
        ],
        "status": "Booked"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    const roomAfterEdit = await Room.findOne({ _id: roomExist!._id })
    expect(roomAfterEdit).toEqual(expect.objectContaining({ room_number: '777' }));

  })
  test('DELETE /room/{id}/delete successfully', async () => {
    const roomExist = await Room.findOne({ room_number: '777' })
    const res = await request(app)
      .delete(`/rooms/${roomExist!._id}/delete`)
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({}));
    const roomAfterEdit = await Room.findOne({ room_number: '777' })
    expect(roomAfterEdit).toEqual(expect.objectContaining({}));
  })
  test('PUT /room/{wrongId}/update should return a 404 "Room not found"', async () => {
    const res = await request(app)
      .put(`/rooms/${id}/update`)
      .send({
        "photo": "https://picsum.photos/100/50",
        "room_number": "999",
        "room_type": "Suite",
        "description": "Conventus deludo defendo vinitor cetera tantillus tamisium varietas spiculum suadeo consuasor tactus utpote antea corroboro verbera tepidus aequitas circumvenio consequatur aetas hic victus supellex curto.",
        "offer": false,
        "price": "555",
        "discount": "0",
        "cancelation": "Explicabo apto aggredior urbanus sortitus natus alias cuius saepe apparatus aveho temptatio adfectus tutis volup.",
        "amenities": [
          "AC",
          "Jacuzzi",
          "King Size Bed",
          "60\" TV",
          "Wifi"
        ],
        "status": "Booked"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Room Id Not Found');
  })
  test('DELETE /room/testingWrongId/delete should return a 404 "Room ID not found"', async () => {
    const res = await request(app)
      .delete(`/rooms/${id}/delete`)
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.status).toBe('fail')
    expect(res.body.message).toEqual('Room Id Not Found');
  })
})













describe('Users Tests', () => {
  const id = '6617bcf9d99250888cf888d1'
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
  test('GET /users with WRONG token should get a 403 status', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', wrongToken)
    expect(res.statusCode).toEqual(403)
    expect(res.body.error.message).toContain('Token is not correct')
  })
  test('GET /users has a response body length of 10 [devMode]', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', token)
    expect(res.body).toHaveLength(10)
  })
  test('GET /users/{invalid id} should return 400 "CastError: Invalid id"', async () => {
    const res = await request(app)
      .get('/users/xxxxx')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('Invalid _id');
  })
  test('GET /users/{wrong id} should return 404 "User ID not found"', async () => {
    const res = await request(app)
      .get(`/users/${id}`)
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.error.message).toEqual('User Id Not Found');
  })
  test('GET /users/{specific id} has a email of Aniya10@yahoo.com [devMode] ', async () => {
    const res = await request(app)
      .get('/users/6617bcdc9e179f98f0c98988')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ email: 'Aniya10@yahoo.com' }));
  })
  test('POST /users/create without user email return a Validation Error', async () => {
    const res = await request(app)
      .post('/users/create')
      .send({
        "_id": `${id}`,
        "photo": "https://i.pravatar.cc/50",
        "full_name": "TEST NAME",
        "start_date": "1684752756344",
        "description": "Adnuo testimonium commemoro magni deduco maiores super arto eligendi aggredior perspiciatis ulterius consequatur odit quaerat nesciunt careo desino ambulo caecus averto aranea acerbitas voveo nostrum cum culpo amoveo voveo desipio vitae voluptas.",
        "position": "Receptionist",
        "phone": "901-951-2261",
        "status": "Inactive",
        "password": "$2a$10$2Ipkh7V0N93ddzGrn8V8V.GLbS/XT2kj9PvN.Bw1abTKZer4feVpO"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('Email is necessary');
  })
  test('POST /users/create successfully', async () => {
    const res = await request(app)
      .post('/users/create')
      .send({
        "_id": `${id}`,
        "photo": "https://i.pravatar.cc/50",
        "full_name": "TEST NAME",
        "email": "test@example.com",
        "start_date": "1684752756344",
        "description": "Adnuo testimonium commemoro magni deduco maiores super arto eligendi aggredior perspiciatis ulterius consequatur odit quaerat nesciunt careo desino ambulo caecus averto aranea acerbitas voveo nostrum cum culpo amoveo voveo desipio vitae voluptas.",
        "position": "Receptionist",
        "phone": "901-951-2261",
        "status": "Inactive",
        "password": "$2a$10$2Ipkh7V0N93ddzGrn8V8V.GLbS/XT2kj9PvN.Bw1abTKZer4feVpO"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ full_name: "TEST NAME" }));
  })
  test('GET recent created user should return 200 name as TEST NAME', async () => {
    const res = await request(app)
      .get(`/users/${id}`)
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({ full_name: 'TEST NAME' }));
  })
  test('POST /users/create with ID already exists', async () => {
    const res = await request(app)
      .post('/users/create')
      .send({
        "_id": `${id}`,
        "photo": "https://i.pravatar.cc/50",
        "full_name": "TEST NAME",
        "email": "test@example.com",
        "start_date": "1684752756344",
        "description": "Adnuo testimonium commemoro magni deduco maiores super arto eligendi aggredior perspiciatis ulterius consequatur odit quaerat nesciunt careo desino ambulo caecus averto aranea acerbitas voveo nostrum cum culpo amoveo voveo desipio vitae voluptas.",
        "position": "Receptionist",
        "phone": "901-951-2261",
        "status": "Inactive",
        "password": "$2a$10$2Ipkh7V0N93ddzGrn8V8V.GLbS/XT2kj9PvN.Bw1abTKZer4feVpO"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('already exist. please use another')

  })
  test('PUT /user/{id}/update successfully', async () => {
    const userExist = await User.findOne({ full_name: 'TEST NAME' })
    const res = await request(app)
      .put(`/users/${userExist!._id}/update`)
      .send({
        "photo": "https://i.pravatar.cc/50",
        "full_name": "TEST NAME MODIFIED",
        "email": "test@example.com",
        "start_date": "1684752756344",
        "description": "Adnuo testimonium commemoro magni deduco maiores super arto eligendi aggredior perspiciatis ulterius consequatur odit quaerat nesciunt careo desino ambulo caecus averto aranea acerbitas voveo nostrum cum culpo amoveo voveo desipio vitae voluptas.",
        "position": "Receptionist",
        "phone": "901-951-2261",
        "status": "Inactive",
        "password": "$2a$10$2Ipkh7V0N93ddzGrn8V8V.GLbS/XT2kj9PvN.Bw1abTKZer4feVpO"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    const userAfterEdit = await User.findOne({ _id: userExist!._id })
    expect(userAfterEdit).toEqual(expect.objectContaining({ full_name: 'TEST NAME MODIFIED' }));

  })
  test('DELETE /user/{id}/delete successfully', async () => {
    const userExist = await User.findOne({ full_name: 'TEST NAME MODIFIED' })
    const res = await request(app)
      .delete(`/users/${userExist!._id}/delete`)
      .set('Authorization', token)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.objectContaining({}));
    const userAfterEdit = await User.findOne({ full_name: 'TEST NAME MODIFIED' })
    expect(userAfterEdit).toEqual(expect.objectContaining({}));
  })
  test('PUT /user/{wrongId}/update should return a 404 "User not found"', async () => {
    const res = await request(app)
      .put(`/users/${id}/update`)
      .send({
        "photo": "https://i.pravatar.cc/50",
        "full_name": "TEST NAME MODIFIED",
        "email": "test@example.com",
        "start_date": "1684752756344",
        "description": "Adnuo testimonium commemoro magni deduco maiores super arto eligendi aggredior perspiciatis ulterius consequatur odit quaerat nesciunt careo desino ambulo caecus averto aranea acerbitas voveo nostrum cum culpo amoveo voveo desipio vitae voluptas.",
        "position": "Receptionist",
        "phone": "901-951-2261",
        "status": "Inactive",
        "password": "$2a$10$2Ipkh7V0N93ddzGrn8V8V.GLbS/XT2kj9PvN.Bw1abTKZer4feVpO"
      })
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('User Id Not Found');
  })
  test('DELETE /user/testingWrongId/delete should return a 404 "User ID not found"', async () => {
    const res = await request(app)
      .delete(`/users/${id}/delete`)
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.status).toBe('fail')
    expect(res.body.message).toEqual('User Id Not Found');
  })
})