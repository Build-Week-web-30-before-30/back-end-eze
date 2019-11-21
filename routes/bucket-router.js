const express = require('express');
const authenticate = require('../middleware/authenticate')
const bucketsDB = require('../models/bucket-model');
const todosDB = require('../models/todo-model');
const linksDB = require('../models/link-model');

const router = express.Router();

// BUCKETS
router.route('/')
    .get(async (req, res) => {
        try {
            const buckets = await bucketsDB.findPublic();

            res.status(200).json(buckets.map(bucket => {
                return {
                    id: bucket.id,
                    bucket_name: bucket.bucket_name,
                    visibility: bucket.visibility ? true : false,
                    deadline: bucket.deadline,
                    user_id: bucket.user_id
                }
            }));
        } catch(err) {
            res.status(500).json({ message: 'failed to get public buckets'})
        }
    })
    .post(authenticate, async (req, res) => {
        try {
            const bucket = await bucketsDB.add(req.body);

            res.status(201).json({
                message: 'bucket created successfully',
                bucket: {
                    id: bucket.id,
                    bucket_name: bucket.bucket_name,
                    visibility: bucket.visibility ? true : false,
                    deadline: bucket.deadline,
                    user_id: bucket.user_id
                }
            });
        } catch(err) {
            res.status(500).json({ message: 'failed to create new bucket'})
        }
    })

router.route('/:id')   
    .get(async (req, res) => {
        try {
            const bucket = await bucketsDB.findById(req.params.id);

            res.status(200).json({
                id: bucket.id,
                bucket_name: bucket.bucket_name,
                visibility: bucket.visibility ? true : false,
                deadline: bucket.deadline,
                user_id: bucket.user_id
            });
        } catch(err) {
            res.status(500).json({ message: 'failed to get single public bucket'})
        }
    })
    .put(authenticate, async (req, res) => {
        try {
            const bucket = await bucketsDB.modify(req.params.id, req.body);

            res.status(201).json({
                message: 'bucket updated successfully',
                bucket: {
                    id: bucket.id,
                    bucket_name: bucket.bucket_name,
                    visibility: bucket.visibility ? true : false,
                    deadline: bucket.deadline,
                    user_id: bucket.user_id
                }
            });
        } catch(err) {
            res.status(500).json({ message: 'failed to update bucket'})
        }
    })


// COMMENTS
router.route('/:id/comments')  
    .get(async (req, res) => {
        try {
            const comment = await bucketsDB.getBucketComments(req.params.id);

            res.status(200).json(comment);
        } catch(err) {
            res.status(500).json({ message: `failed to fetch comment for bucket ${req.params.id}`})
        }
    })
    .post(authenticate, async (req, res) => {
        try {
            const newComment = {
                bucket_id: req.params.id,
                message: req.body.message
            }
            const comment = await bucketsDB.addComment(newComment);

            res.status(201).json({
                message: 'comment added successfully',
                comment: comment
            });
        } catch(err) {
            res.status(500).json({ message: 'failed to add new comment'})
        }
    })


// TODOS
router.route('/:id/todos')  
    .get(async (req, res) => {
        try {
            const todos= await todosDB.getByBucket(req.params.id);

            res.status(200).json(todos.map(todo => {
                return {
                    id: todo.id,
                    todo_name: todo.todo_name,
                    completed: todo.completed ? true : false,
                    bucket_id: todo.bucket_id
                }
            }));
        } catch(err) {
            res.status(500).json({ message: 'failed to get todos for this bucket'})
        }
    })
    .post(authenticate, async (req, res) => {
        try {
            const newTodo = ({
                todo_name: req.body.todo_name,
                completed: req.body.completed,
                bucket_id: req.params.id
            })

            const todo = await todosDB.add(newTodo);
            
            res.status(201).json({
                message: 'todo added successfully',
                todo: {
                    id: todo.id,
                    todo_name: todo.todo_name,
                    completed: todo.completed ? true : false,
                    bucket_id: todo.bucket_id
                }
            });
        } catch(err) {
            res.status(500).json({ message: 'failed to create new todo'})
        }
    })

router.route('/:id/todos/:todo_id')
    .get(async (req, res) => {
        try {
            const todo = await todosDB.getTodoById(req.params.todo_id);

            res.status(200).json({
                id: todo.id,
                todo_name: todo.todo_name,
                completed: todo.completed ? true : false,
                bucket_id: todo.bucket_id
            });
        } catch(err) {
            res.status(500).json({ message: 'failed to get single todo'})
        }
    })
    .put(authenticate, async (req, res) => {
        try {
            const todo = await todosDB.modify(req.params.todo_id, req.body);

            res.status(200).json({
                message: 'todo updated successfully',
                todo: {
                    id: todo.id,
                    todo_name: todo.todo_name,
                    completed: todo.completed ? true : false,
                    bucket_id: todo.bucket_id
                }
            });
        } catch(err) {
            res.status(500).json({ message: 'failed to update todo', error: err.message})
        }
    })


// ACTIVITY LINKS
router.route('/:id/todos/:todo_id/links')  
    .get(async (req, res) => {
        try {
            const links = await linksDB.getByTodo(req.params.todo_id);

            res.status(200).json(links.map(link => {
                return {
                    id: link.id,
                    url: link.url,
                    todo_id: link.todo_id
                }
            }));
        } catch(err) {
            res.status(500).json({ message: 'failed to get links for this todo'})
        }
    })
    .post(authenticate, async (req, res) => {
        try {
            const newLink = ({
                url: req.body.url,
                todo_id: req.params.todo_id
            })

            const link = await linksDB.add(newLink);
            
            res.status(201).json({
                message: 'link added successfully',
                link: {
                    id: link.id,
                    url: link.url,
                    todo_id: link.todo_id
                }
            });
        } catch(err) {
            res.status(500).json({ message: 'failed to create new todo'})
        }
    })


module.exports = router;