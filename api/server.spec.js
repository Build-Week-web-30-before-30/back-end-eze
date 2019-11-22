/* eslint-disable no-undef */
const request = require('supertest')
const server = require('../api/server')

describe('server', () => {
    describe('[GET] / endpoint', () => {
        test('status report', () => {
            return request(server).get('/')
                .expect(200)
                .expect({"message": "Welcome to the 30 before 30 API"})
                .expect('Content-Type', /json/)
        })
    })
})