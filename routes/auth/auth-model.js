const db = require('../../database/dbConfig');


const getUser = (filter) => {
    return db('users').where({id: filter}).first()
    .then((user) => {
        return {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            password: user.password
        }
    });
}

const addUser = (user) => {
    return db('users').insert(user)
        .then((idArr) => getUser(idArr[0]));
}

module.exports = {
    addUser,
    getUser
}