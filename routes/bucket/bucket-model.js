const db = require('../../database/dbConfig');

// Bucket Data Models
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


// Todo Data Models
const getATodo = (id) => {        
    return Promise.all(db('todos').where(id), db('activity_links'))
        .then(([todo, links]) => {
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
        })
}

const createATodo = (todo) => {
    return db('todos').insert(todo)
        .then((idArr) => getATodo(idArr[0]));
}

const updateATodo = (id, changes) => {
    return db('todos').where({ id }).update(changes)
        .then(() => getATodo(id));
}


// Activity Links Data Models
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


// Comments Data Models
const getAComment = (id) => {        
    return db('comments').where(id)
        .then(comment => {
            return {
                id: comment.id,
                message: comment.message
            }
        })
}

const createAComment = (comment) => {
    return db('comments').insert(comment)
        .then((idArr) => getAComment(idArr[0]));
}


module.exports = {
    getBuckets,
    getABucket,
    createALink,
    createATodo,
    createABucket,
    createAComment,
    updateATodo,
    updateABucket,
    deleteABucket
}