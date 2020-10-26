const jwt = require("jsonwebtoken");

const jwtGenerator = (username) => {
    const payload = {
        username: username
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
}

module.exports = jwtGenerator;