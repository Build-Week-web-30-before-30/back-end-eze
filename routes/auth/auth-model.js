const db = require('../../database/dbConfig');

const getUser = (filter) => {
    return db('users').where({userName: filter}).first();
}

const addUser = (user) => {
    return db('users').insert(user)
        .then((idArr) => getUser({ id: idArr[0] }));
}

module.exports = {
    addUser,
    getUser
}