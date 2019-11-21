const db = require('../../database/dbConfig');
  
function find() {
    return db('board').select('id', 'name', 'public', 'user_id');
}
  
function findPublic() {
    return db('board').where({ visibility: true });
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
  
async function addFeedback(newComment) {
    const [ id ] = await db('comments').insert(newComment);

    return findCommentById(id);
}

async function getBucketComments(bucket_id) {
    const feedbacks = await db('feedback').where({ bucket_id: bucket_id });

    return feedbacks;
}
  
async function modify(board_id, changes) {
    await db('board')
        .update(changes)
        .where({ id: board_id })

    return findById(board_id);
}

module.exports = {
    add,
    find,
    findPublic,
    findById,
    findCommentById,
    addFeedback,
    getBucketComments,
    modify
};
