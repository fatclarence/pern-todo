const pool = require("../db");
const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const jwtGenerator = require("../utils/jwtGenerator");
const validator = require("../utils/validator");

// Registration
router.post("/register", validator, async (req, res) => {
    try {
        // // Destructure req body: 
        // const {
        //     username,
        //     email,
        //     password,
        //     confirmPassword
        // } = req.body;

        // // Password validation 
        // if (password !== confirmPassword) {
        //     return res.status(401).json("Please make sure your passwords mathc!");
        // }

        // // Check if user exist, if yes, throw error
        // const user = await pool.query(
        //     `SELECT * FROM users WHERE username = $1`,
        //     [
        //         username
        //     ]
        // );

        // if (user.rows.length !== 0) {
        //     return res.status(401).json("Username already exist");
        // }

        // // Check if email already in use, if yes, throw error
        // const email = await pool.query(
        //     `SELECT * FROM users WHERE email = $1`,

        // )

    } catch (err) {
        console.error(err.message);

        // Post failure
        res.status(500).json("Server error: Check your internet connection!");
    }
});

module.exports = router;