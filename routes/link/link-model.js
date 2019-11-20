const db = require('../../database/dbConfig');

const getALink = (id) => {        
    return db('activity_links').where(id)
        .then(link => {
            return {
                id: link.id,
                url: link.url
            }
        })
}

const createALink = (link) => {
    return db('activity_links').insert(link)
        .then((idArr) => getALink(idArr[0]));
}


module.exports = {
    getALink,
    createALink
}