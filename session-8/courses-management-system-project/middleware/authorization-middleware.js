const authorizationMiddleware = (...roles) => {
    return (req, res, next) => {

        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
            return res.status(403).json({ status: "fail", message: "Forbidden: You do not have permission to access this resource." });
        }
        next();
    };
};

module.exports = authorizationMiddleware;