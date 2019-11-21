const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../routes/auth-router');
const bucketsRouter = require('../routes/bucket-router');
const userRouter = require('../routes/user-router');

const server = express();

const middleware = [helmet(), cors(), express.json()];
server.use(middleware);

server.use('/api/auth', authRouter);
server.use('/api/buckets', bucketsRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.json({message: "Welcome to 30 before 30 API"})
})

module.exports = server;