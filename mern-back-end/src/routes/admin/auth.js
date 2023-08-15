const express = require('express');
const router = express.Router();
const { signup, signin, requireSignin } = require('../../controllers/admin/auth');
const { validateSigninRequest, validateSignupRequest, isRequestValidated } = require('../../validators/auth');
// Note mongoose does not accept callbacks on some of its functions rather use then catch block

router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);

// router.post('/admin/profile', requireSignin, (req, res) => { 
//     res.status(200).json({ user: 'profile'});
// });

module.exports = router;