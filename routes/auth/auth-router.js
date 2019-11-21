const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const db = require('./auth-model');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
  
    db.add(user)
        .then(() => {
            res.status(201).json({message: 'sign up successful'});
        })
        .catch(error => {
            res.status(500).json(error);
        });
});
  
router.post('/login', validateCredentials, (req, res) => {
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
  

//Middleware
function validateCredentials(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(401).json({ message: "username and password required" });
    } else {
        next();
    }
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
