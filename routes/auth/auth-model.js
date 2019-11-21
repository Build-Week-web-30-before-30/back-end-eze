const db = require('../../database/dbConfig');


const getUser = (filter) => {
    return db('users').where({ id: filter }).first()
    .then((user) => {
        return {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            email: user.email
        }
    })
    .catch((err) => {
        console.log(err)
    });
}

const addUser = (user) => {
    return db('users').insert(user)
        .then((idArr) => {
            return getUser(idArr[0])
        })
        .catch((err) => {
            console.log(err)
        });
}

module.exports = {
    addUser,
    getUser
}