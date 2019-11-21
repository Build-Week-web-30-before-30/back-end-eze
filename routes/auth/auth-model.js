const db = require('../../database/dbConfig');


const getUser = (filter) => {
    return db('users')
        .select("id", "username", "email", "full_name")
        .where({id: filter})
        .first()
}

const addUser = (user) => {
    return db('users').insert(user)
        .then((idArr) => getUser(idArr[0]));
}

module.exports = {
    addUser,
    getUser
}