const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/user');
// Note mongoose does not accept callbacks on some of its functions rather use then catch block

router.post('/signin', (req, res) => {
});

router.post('/signup', signup);

module.exports = router;