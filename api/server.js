const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const bucketsRouter = require('../routes/bucket/bucket-router');
const todosRouter = require('../routes/todo/todo-router');
const linksRouter = require('../routes/link/link-router');

const server = express();

const middleware = [helmet(), cors(), express.json()];
server.use(middleware);

server.use('/api/buckets', bucketsRouter);
server.use('/api/todos', todosRouter);
server.use('/api/links', linksRouter);

server.get('/', (req, res) => {
    res.json({message: "Welcome to 30 before 30 API"})
})

module.exports = server;