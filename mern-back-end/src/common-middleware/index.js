const jwt = require('jsonwebtoken');

// require sign in token validation
exports.requireSignin = (req, res, next) => {
    if( req.headers.authorization )
    {
        const token = req.headers.authorization.split(" ")[1];
        const userTok = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(token);
        req.user = userTok;
    } else {
        return res.status(400).json({ message: "Authorization required" });
    }
    next();
    
}

exports.userMiddleware = (req, res, next) => {
    if( req.user.role !== 'admin') {
        return res.status(400).json({ message: "User access denied" });
    }
    next();
}

exports.adminMiddleware = (req, res, next) => {
    if( req.user.role !== 'admin') {
        return res.status(400).json({ message: "Admin access denied" });
    }
    next();
}