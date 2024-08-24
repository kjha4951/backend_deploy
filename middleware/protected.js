const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Extract token from header
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; 

    // Check if token is present
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; 
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
