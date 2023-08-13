const express = require('express');
const router = express.Router();
const { signup, signin, requireSignin } = require('../controllers/auth');
// Note mongoose does not accept callbacks on some of its functions rather use then catch block

router.post('/signin', signin);

router.post('/signup', signup);

router.post('/profile', requireSignin, (req, res) => { 
    res.status(200).json({ user: 'profile'});
});

module.exports = router;