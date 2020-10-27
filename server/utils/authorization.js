const jwt = require("jsonwebtoken");
// require("dotenv").config();

// Check if JWT is valid
module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.header("token");

        if(!jwtToken) {
            return res.status(403).json("User not authorized");
        }

        // See jwtGenerator for payload details
        const payload  = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.username = payload.username;
        next();
    } catch(err) {
        console.error(err.message);
        return res.status(403).json("User not authorized");
    }
}