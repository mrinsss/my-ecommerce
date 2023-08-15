const express = require("express");

const router = express.Router();
const { signup, signin } = require("../controllers/auth"); // requireSignin
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../validators/auth");
// Note mongoose does not accept callbacks on some of its functions rather use then catch block

router.post("/signin", validateSigninRequest, isRequestValidated, signin);

router.post("/signup", validateSignupRequest, isRequestValidated, signup);

// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({ user: "profile" });
// });

module.exports = router;
