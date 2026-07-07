const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const authenticateMiddleware = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
    token = token.slice(7);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ status: "fail", message: "Unauthorized" });
        }
        req.user = decoded;
        req.user.role = user.role; // Attach the user's role to the request object
        
        next();
    } catch (error) {
        return res.status(401).json({ status: "fail", message: "Invalid token" });
    }
};

module.exports = authenticateMiddleware;