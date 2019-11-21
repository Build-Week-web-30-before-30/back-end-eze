const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./auth-model');


router.post('/register', validateCredentials, (req, res) => {
    const { password } = req.body;
    const hash = bcrypt.hashSync(password, 11);

    db.addUser({ ...req.body, password: hash })
        .then((user) => {
            res.status(201).json(user);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/login', validateCredentials, (req, res) => {
    const { userName, password } = req.body;

    db.getUser(userName)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        })
        .catch((error) => {
            res.status(401).json(error);
        });
});


//Middleware
function validateCredentials(req, res, next) {
    const { userName, password } = req.body;

    if (!userName || !password) {
        res.status(401).json({ message: "username and password required" });
    } else {
        next();
    }
}

function doesUserExist(req, res, next) {
    const { userName } = req.body;

    db.getUser(userName)
        .then((user) => {
            if(user) {
                res.status(401).json({ message: "User already exists" });
            } else {
                next();
            }
        })
        .catch(() => {
            res.status(401).json({ message: "No user found" });
        });
}

function generateToken(user) {
    return jwt.sign(
        {
            subject: user.id,
            userName: user.userName
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d',
        }
    );
}

module.exports = router;
