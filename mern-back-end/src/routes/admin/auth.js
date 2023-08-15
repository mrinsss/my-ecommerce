const express = require('express');
const router = express.Router();
const { signup, signin } = require('../../controllers/admin/auth');
const { validateSigninRequest, validateSignupRequest, isRequestValidated } = require('../../validators/auth');
// Note mongoose does not accept callbacks on some of its functions rather use then catch block

router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);


module.exports = router;