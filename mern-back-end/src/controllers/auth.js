const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const { validationResult } = require("express-validator");

// write the functions here below
// sign up
exports.signup = (req, res) => {
    // use validation result
    // const validErrs = validationResult(req);
    // return res.status(400).json({ message: validErrs.array() });

    User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: "User already registered" });
      }

      // destructuring req body
      const { firstName, lastName, email, password } = req.body;

      const _user = new User({
        firstName,
        lastName,
        email,
        password,
        username: email,
      });

      _user
        .save()
        .then((data) => {
          if (data) {
            return res
              .status(201)
              .json({ message: "User created successfully", user: data });
          }
        })
        .catch((error) => {
          return res.status(400).json({ message: "Something went wrong" });
        });
    })
    .catch((err) => {
      //catch error
      return res.status(400).json({ message: "Something went wrong" });
    });
};

// sign in
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        if (user.authenticate(req.body.password)) {
          const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          // destructuring req body
          const { _id, firstName, lastName, email, role, fullName } = user;
          res.status(200).json({
            message: "User found successfully",
            token: token,
            user: {
              _id,
              firstName,
              lastName,
              email,
              role,
              fullName,
            },
          });
        } else {
          return res.status(400).json({ message: "Invalid password" });
        }
      } else {
        return res.status(400).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      //catch error
      return res.status(400).json({ message: "User not found" });
    });
};

// require sign in token validation
/*
exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const userTok = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(token);
  req.user = userTok;
  next();
};*/
