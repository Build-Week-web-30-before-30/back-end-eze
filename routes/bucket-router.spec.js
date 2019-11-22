/* eslint-disable no-undef */
const request = require('supertest')
const server = require('../api/server.js')

describe('server', () => {
    describe('[GET] /api/buckets endpoint', () => {

        test('can fetch all public buckets', async () => {
            const response = await request(server)
                .get('/api/buckets')
                .expect('Content-Type', /json/)

                expect(response.status).toBe(200)
        })

    })

    describe('[POST] /api/buckets endpoint', () => {

        test('can create new bucket', async () => {
            const response = await request(server)
                .post('/api/buckets')
                .set('Authorization', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImFkbWluMCIsImlhdCI6MTU3NDQwNzM0MywiZXhwIjoxNTc0NDkzNzQzfQ.mJx8SDOzVCFdNpKgilZCyc6_SDLsb6wNwGUoHi88mCM`)
                .send({ 
                    bucket_name: 'goals', 
                    visibility: true, 
                    deadline: '2020-04-03', 
                    user_id: 1 
                })
                .expect('Content-Type', /json/)

                expect(response.status).toBe(201)
        })
    })

    // Single Bucket
    describe('[GET] /api/buckets/:id endpoint', () => {

        test('can get a single bucket', async () => {
            const response = await request(server)
                .get('/api/buckets')
                .expect('Content-Type', /json/)

                expect(response.status).toBe(200)
        })
    })

    describe('[PUT] /api/buckets/:id endpoint', () => {

        test('can update bucket successfully', async () => {
            const response = await request(server)
                .put('/api/buckets/1')
                .set('Authorization', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImFkbWluMCIsImlhdCI6MTU3NDQwNzM0MywiZXhwIjoxNTc0NDkzNzQzfQ.mJx8SDOzVCFdNpKgilZCyc6_SDLsb6wNwGUoHi88mCM`)
                .send({ 
                    bucket_name: 'goals', 
                    visibility: true, 
                    deadline: '2020-04-03', 
                    user_id: 1 
                })
                .expect('Content-Type', /json/)

                expect(response.status).toBe(201)
        })

    })

    //Comments
    describe('[GET] /api/buckets/:id/comments endpoint', () => {

        test('can get all comments for a bucket', async () => {
            const response = await request(server)
                .get('/api/buckets/1/comments')
                .expect('Content-Type', /json/)

                expect(response.status).toBe(200)
        })
    })

    describe('[POST] /api/buckets/:id/comments endpoint', () => {

        test('can create a new comment', async () => {
            const response = await request(server)
                .post('/api/buckets/1/comments')
                .set('Authorization', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImFkbWluMCIsImlhdCI6MTU3NDQwNzM0MywiZXhwIjoxNTc0NDkzNzQzfQ.mJx8SDOzVCFdNpKgilZCyc6_SDLsb6wNwGUoHi88mCM`)
                .send({ 
                    message: "I love it!!!"
                })
                .expect('Content-Type', /json/)

                expect(response.status).toBe(201)
        })

    })

    // Todos
    describe('[GET] /api/buckets/:id/todos endpoint', () => {

        test('can get all todos for a bucket', async () => {
            const response = await request(server)
                .get('/api/buckets/1/todos')
                .expect('Content-Type', /json/)

                expect(response.status).toBe(200)
        })
    })

    describe('[POST] /api/buckets/:id/todos endpoint', () => {

        test('can create a new todo', async () => {
            const response = await request(server)
                .post('/api/buckets/1/todos')
                .set('Authorization', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImFkbWluMCIsImlhdCI6MTU3NDQwNzM0MywiZXhwIjoxNTc0NDkzNzQzfQ.mJx8SDOzVCFdNpKgilZCyc6_SDLsb6wNwGUoHi88mCM`)
                .send({
                    todo_name: 'Hello!!!',
                    completed: true
                })
                .expect('Content-Type', /json/)

                expect(response.status).toBe(201)
        })

    })

    describe('[GET] /api/buckets/:id/todos/:todo_id endpoint', () => {

        test('can get a single todo', async () => {
            const response = await request(server)
                .get('/api/buckets/1/todos/1')
                .expect('Content-Type', /json/)

                expect(response.status).toBe(200)
        })
    })

    describe('[PUT] /api/buckets/:id/todos/:todo_id endpoint', () => {

        test('can edit a todo', async () => {
            const response = await request(server)
                .put('/api/buckets/1/todos/1')
                .set('Authorization', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImFkbWluMCIsImlhdCI6MTU3NDQwNzM0MywiZXhwIjoxNTc0NDkzNzQzfQ.mJx8SDOzVCFdNpKgilZCyc6_SDLsb6wNwGUoHi88mCM`)
                .send({
                    todo_name: 'Hello!!!',
                    completed: true
                })
                .expect('Content-Type', /json/)

                expect(response.status).toBe(201)
        })

    })

    // Activity Links
    describe('[GET] /api/buckets/:id/todos/:todo_id/links endpoint', () => {

        test('can get all activity links for a todo', async () => {
            const response = await request(server)
                .get('/api/buckets/1/todos/1/links')
                .expect('Content-Type', /json/)

                expect(response.status).toBe(200)
        })
    })

    describe('[POST] /api/buckets/:id/todos/:todo_id/linls endpoint', () => {

        test('can create a new activity link', async () => {
            const response = await request(server)
                .post('/api/buckets/1/todos/1/links')
                .set('Authorization', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImFkbWluMCIsImlhdCI6MTU3NDQwNzM0MywiZXhwIjoxNTc0NDkzNzQzfQ.mJx8SDOzVCFdNpKgilZCyc6_SDLsb6wNwGUoHi88mCM`)
                .send({
                    url: 'http://www.lola.com',
                    completed: true
                })
                .expect('Content-Type', /json/)

                expect(response.status).toBe(201)
        })

    })
})