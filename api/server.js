const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const middleware = [helmet(), cors(), express.json()];
server.use(middleware);

server.get('/', (req, res) => {
    res.json({message: "Welcome to 30 before 30 API"})
})

module.exports = server;