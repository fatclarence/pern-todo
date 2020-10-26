const validator = async (req, res, next) => {
    // const { email, name, password } = req.body;
    const {
        username,
        email,
        password,
        confirmPassword
    } = req.body;

    // check if email provided is valid
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/register") {
        console.log(!email.length);
        if (![username, email, password, confirmPassword].every(Boolean)) {
            // unauthenticated
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    } else if (req.path === "/login") {
        if (![username, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        }
    }

    // Continue on with the route
    next();
};

module.exports = validator;