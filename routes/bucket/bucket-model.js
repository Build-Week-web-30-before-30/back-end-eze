const db = require('../../database/dbConfig');

const getBuckets = () => {
    const queries = [
        db('buckets'), 
        db('todos'), 
        db('activity_links'), 
        db('comments')
    ]
        
    return Promise.all(queries)
        .then(([buckets, todos, links, comments]) => {
            return buckets.map(bucket => {
                return {
                    id: bucket.id,
                    name: bucket.bucket_name,
                    visibility: bucket.visibility ? true : false,
                    deadline: bucket.deadline,
                    todos: todos
                        .filter(todo => bucket.id === todo.bucket_id)
                        .map(todo => {
                            return {
                                id: todo.id,
                                todo_name: todo.todo_name,
                                completed: todo.completed ? true : false,
                                activity_links: links
                                    .filter(link => todo.id === link.todo_id)
                                    .map(link => {
                                        return {
                                            id: link.id,
                                            url: link.url
                                        }
                                    })
                            }
                    }),
                    comments: comments
                        .filter(comment => bucket.id === comment.bucket_id)
                        .map(comment => {
                            return {
                                id: comment.id,
                                message: comment.message
                            }
                        })
                }
            })
        })
}

const getABucket = (id) => {
    const queries = [
        db('buckets').where({id: id}).first(),
        db('todos').where({bucket_id: id}), 
        db('activity_links'), 
        db('comments').where({bucket_id: id})
    ]
        
    return Promise.all(queries)
        .then(([bucket, todos, links, comments]) => {
            return {
                id: bucket.id,
                name: bucket.bucket_name,
                visibility: bucket.visibility ? true : false,
                deadline: bucket.deadline,
                todos: todos
                    .map(todo => {
                        return {
                            id: todo.id,
                            todo_name: todo.todo_name,
                            completed: todo.completed ? true : false,
                            activity_links: links
                                .filter(link => todo.id === link.todo_id)
                                .map(link => {
                                    return {
                                        id: link.id,
                                        url: link.url
                                    }
                                })
                        }
                    }),
                comments: comments
                    .map(comment => {
                        return {
                            id: comment.id,
                            message: comment.message
                        }
                    })
            }
        })
}

const createABucket = (bucket) => {
    return db('buckets').insert(bucket)
        .then((idArr) => getABucket(idArr[0]));
}

const updateABucket = (id, changes) => {
    return db('buckets').where({ id }).update(changes)
        .then(() => getABucket(id));
}

const deleteABucket = (id) => {
    return db('buckets').where({ id }).del();
}


module.exports = {
  getBuckets,
  getABucket,
  createABucket,
  updateABucket,
  deleteABucket
}