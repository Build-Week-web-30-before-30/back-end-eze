const express = require('express');
const verifyToken = require('../middlewares/verifyToken')
const bucketsDB = require('./bucket-model');
const todosDB = require('../todos/todo-model');

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const buckets = await bucketsDB.findPublic();

            res.status(200).json(buckets);
        } catch(err) {
            res.status(500).json({ message: 'failed to get public buckets'})
        }
    })
    .post(verifyToken, async (req, res) => {
        try {
            const bucket = await bucketsDB.add(req.body);

            res.status(201).json({
                message: 'bucket created successfully',
                bucket: bucket
            });
        } catch(err) {
            res.status(500).json({ message: 'failed to create new bucket'})
        }
    })

router.route('/:id')   
    .put(verifyToken, async (req, res) => {
        try {
            const bucket = await bucketsDB.modify(req.params.id, req.body);

            res.status(201).json({
                message: 'bucket updated successfully',
                bucket: bucket
            });
        } catch(err) {
            res.status(500).json({ message: 'failed to update bucket'})
        }
    })

router.route('/:id/comments')   
    .post(verifyToken, async (req, res) => {
        try {
            const newComment = {
                bucket_id: req.params.id,
                text: req.body.text
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
    .get(verifyToken, async (req, res) => {
        try {
            const comment = await bucketsDB.getBucketComment(req.params.id);

            res.status(200).json(comment);
        } catch(err) {
            res.status(500).json({ message: `failed to fetch comment for bucket ${req.params.id}`})
        }
    })

router.route('/:id/todos')  
    .get(async (req, res) => {
        try {
            const todos= await todosDB.getByBucket(req.params.id);

            res.status(200).json(todos);
        } catch(err) {
            res.status(500).json({ message: 'failed to get todos for this bucket'})
        }
    })
    .post(verifyToken, async (req, res) => {
        try {
            const newTodo = ({
                name: req.body.name,
                completed: req.body.completed,
                bucket_id: req.params.id
            })
            const todo = await todosDB.add(newTodo);

            res.status(201).json({
                message: 'todo added successfully',
                todo: todo
            });
        } catch(err) {
            res.status(500).json({ message: 'failed to create new todo'})
        }
    })


module.exports = router;