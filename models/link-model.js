const db = require('../database/dbConfig.js');


function getByTodo(todo_id) {
    return db('activity_links').where({todo_id: todo_id});
}

function getLinkById(id) {
    return db('activity_links').where({id: id}).first();
}

async function add(link) {
    const [id] = await db('activity_links').insert(link);

    return getLinkById(id);
}

module.exports = {
    add,
    getByTodo,
    getLinkById
};