// validator
const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("firstName is required."),
  check("lastName").notEmpty().withMessage("lastName is required."),
  check("email").isEmail().withMessage("Valid email is required."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters."),
];

exports.validateSigninRequest = [
    check("email").isEmail().withMessage("Valid email is required."),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password is required."),
  ];

exports.isRequestValidated = (req, res, next) => {
    const validErrs = validationResult(req);
    if( validErrs.array().length > 0 ) {
        return res.status(400).json({ message: validErrs.array()[0].msg });
    }
    next();
}