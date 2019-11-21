const express = require('express');
const authenticate = require('../middleware/authenticate');
const bucketsDB = require('../models/bucket-model');
const usersDB = require('../models/user-model');


const router = express.Router();

router.route('/:username/buckets')
    .get(authenticate, async (req, res) => {
        try {
            const user = await usersDB.findByUsername(req.params.username);
            const buckets = await bucketsDB.getByUser(user.id);

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
            res.status(500).json({ message: 'failed to get buckets for this user'})
        }
    })


module.exports = router;