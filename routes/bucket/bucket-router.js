const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const db = require('./bucket-model');

const router = express.Router();

router.route('/')
    .get((req, res) => {
        db.getBuckets()
            .then(response => {
                res.status(200).json(response);
            })
    })
    .post((req, res) => {
        db.createABucket(req.body)
            .then(response => {
                res.status(200).json(response);
            })
    })


router.route('/:id')
    .get((req, res) => {
        db.getABucket(req.params.id)
            .then(response => {
                res.status(200).json(response);
            })
    })

router.route('/:id/todos')
router.route('/:id/comments')
router.route('/:id/todos/:todo_id')
router.route('/:id/todos/:todo_id/links')


module.exports = router;