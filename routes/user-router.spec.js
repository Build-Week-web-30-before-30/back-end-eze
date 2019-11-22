/* eslint-disable no-undef */
const request = require('supertest')
const server = require('../api/server.js')

describe('server', () => {
    describe('[GET] /api/user/:username/buckets endpoint', () => {

        test('can fetch all public buckets', async () => {
            const response = await request(server)
                .get('/api/user/admin0/buckets')
                .set('Authorization', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImFkbWluMCIsImlhdCI6MTU3NDQwNzM0MywiZXhwIjoxNTc0NDkzNzQzfQ.mJx8SDOzVCFdNpKgilZCyc6_SDLsb6wNwGUoHi88mCM`)
                .expect('Content-Type', /json/)

                expect(response.status).toBe(200)
        })

    })
})