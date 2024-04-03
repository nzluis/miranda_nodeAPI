import { describe, expect, test } from '@jest/globals';
import request from 'supertest'
import { app } from './src/app'

describe('Bookings Tests', () => {
  test('GET /bookings should be status code 200', async () => {
    const res = await request(app)
      .get('/bookings')

    expect(res.statusCode).toEqual(200)
  })
})
