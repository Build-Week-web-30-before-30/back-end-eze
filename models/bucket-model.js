const db = require('../database/dbConfig');
  
  
function findPublic() {
    return db('buckets').where({ visibility: true });
}

function findById(id) {
    return db('buckets')
        .where({ id })
        .first();
}


function findCommentById(id) {
    return db('comments').where({ id }).first();
}
  
async function add(newBucket) {
    const [id] = await db('buckets').insert(newBucket);

    return findById(id);
}
  
async function addComment(newComment) {
    const [ id ] = await db('comments').insert(newComment);

    return findCommentById(id);
}

function getByUser(id) {
    return db('buckets').where({user_id: id});
}

async function getBucketComments(bucket_id) {
    const comments = await db('comments').where({ bucket_id: bucket_id });

    return comments;
}
  
async function modify(bucket_id, changes) {
    await db('buckets')
        .update(changes)
        .where({ id: bucket_id })

    return findById(bucket_id);
}

module.exports = {
    add,
    findPublic,
    findById,
    findCommentById,
    addComment,
    getByUser,
    getBucketComments,
    modify
};
