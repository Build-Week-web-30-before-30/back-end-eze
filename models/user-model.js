const db = require('../database/dbConfig');

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [ id ] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users').where({ id }).first();
}

function findByUsername(username) {
  return db('users').where({ username: username }).first();
}

module.exports = {
  add,
  findBy,
  findById,
  findByUsername
}