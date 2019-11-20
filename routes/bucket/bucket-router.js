const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const db = require('./bucket-model');

const router = express.Router();

router.get('/', (req, res) => {
    db.getBuckets()
        .then(response => {
            res.status(200).json(response);
        })
})

router.get('/:id', (req, res) => {
    db.getABucket(req.params.id)
        .then(response => {
            res.status(200).json(response);
        })
})

module.exports = router;