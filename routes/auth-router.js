const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../models/user-model');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
  
    db.add(user)
        .then(() => {
            res.status(201).json(user);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});
  
router.post('/login', (req, res) => {
    let { username, password } = req.body;

    db.findBy({ username }).first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);

                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token: token
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(error => {
            res.status(500).json({req: req.body, error: error.message});
        });
});

function generateToken(user) {
    return jwt.sign(
        {
            subject: user.id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d',
        }
    );
}

module.exports = router;
