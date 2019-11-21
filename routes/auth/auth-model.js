const db = require('../../database/dbConfig');

const getUser = (filter) => {
    return db('users').where({id: filter}).first()
        .then(user => {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                full_name: user.full_name,
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