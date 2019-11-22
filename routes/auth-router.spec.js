/* eslint-disable no-undef */
const request = require('supertest')
const router = require('../api/server')
const db = require('../database/dbConfig')

beforeAll(async () => {
  await db('users').truncate()
})

describe('register & login tests', () => {
    describe('[POST] /api/auth/register endpoint', () => {
        test('registers new user', async () => {
            const response = await request(router)
                .post('/api/auth/register')
                .send({username: 'admin0', email: 'admin0@gmail.com', full_name: 'admin0', password: 'admin0' })

            expect(response.status).toBe(201)
        }) 
        
        test('fails when required fields are ommitted', async () => {
            const response = await request(router)
                .post('/api/auth/register')
                .send({email: 'admin@gmail.com', full_name: 'admin', password: 'admin' })

            expect(response.status).toBe(500)
        }) 
    })


    describe('[POST] /api/auth/login endpoint', () => {
        // test('logs in existing user', async () => {
        //     const response = await request(router)
        //         .post('/api/auth/login')
        //         .send({username: 'admin0', password: 'admin0' })

        //     expect(response.status).toBe(200)
        // }) 

        test('should return 401 Unauthorized', async () => {
            const response = await request(router)
                .post('/api/auth/login')
                .send({ username: 'mike', password: '565' })

            expect(response.status).toBe(401)
        })   
        
        test('fails when required fields are ommitted', async () => {
            const response = await request(router)
                .post('/api/auth/login')
                .send({ password: '12345' })

            expect(response.status).toBe(500)
        }) 
    }) 
})