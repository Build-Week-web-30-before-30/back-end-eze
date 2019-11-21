const db = require('../database/dbConfig.js');


function getByBucket(bucket_id) {
    return db('todos').where({bucket_id: bucket_id});
}

function getTodoById(id) {
    return db('todos').where({id: id}).first();
}

async function add(todo) {
    const [id] = await db('todos').insert(todo);

    return getTodoById(id);
}

async function modify(todo_id, changes) {
    await db('todos')
        .update(changes)
        .where({ id: todo_id })

    return getTodoById(todo_id);
}

module.exports = {
    add,
    modify,
    getByBucket,
    getTodoById
};