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
  test('GET /booking/{wrong id} should return 404 "Booking ID not found"', async () => {
    const res = await request(app)
      .get('/bookings/db05ffe5-3762')
      .set('Authorization', token)
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toBe(true)
    expect(res.body.message).toEqual('Booking ID not found');
  })
  test('GET /booking/{specific id} has a First Name of Ramson [devMode] ', async () => {
    const res = await request(app)
      .get('/bookings/db05ffe5-3762-4756-9c43-ba48bc4dc6ae')
      .set('Authorization', token)
    expect(res.body).toEqual(expect.objectContaining({ first_name: 'Ransom' }));
  })
  test('POST /booking/create successfully', async () => {
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
  test('POST /booking/create with ID already exists', async () => {
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
