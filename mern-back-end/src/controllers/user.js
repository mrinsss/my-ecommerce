const User = require('../models/user');

// write the functions here below
exports.signup = (req, res) => {    

    User.findOne({ email: req.body.email })
    .then( (user) => {
        if (user) {
            return res.status(400).json({ message: 'User already registered' });
        }

        // destructuring req body
        const { firstName, lastName, email, password } = req.body;

        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            username: email
        });

        _user.save()
        .then((data) => {
            if (data) {
                return res.status(201).json({ message: 'User created successfully', user: data });
            }
        }).catch((error) => {
            return res.status(400).json({ message: 'Something went wrong' });
        })        
        
    })
    .catch((err) => {
        //catch error
        return res.status(400).json({ message: 'Something went wrong' });
    });

}