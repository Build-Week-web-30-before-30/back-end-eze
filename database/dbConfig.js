const knex = require('knex');
const config = require('../knexfile.js');

const db = knex(config[process.env.NODE_ENV]);

module.exports = db;