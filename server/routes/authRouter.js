const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const jwtGenerator = require("../utils/jwtGenerator");
const validator = require("../utils/validator");
const db = require("../db");

// Registration
router.post("/register", validator, async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            confirmPassword
        } = req.body;

        // Password validation
        if (password !== confirmPassword) {
            return res.status(401).json("Please make sure your passwords match!");
        } 

        // Check if username / email exists
        db.tx(async t => {
            const user1 = await t.manyOrNone(`SELECT * FROM users WHERE email = $1`, [email]);
            const user2 = await t.manyOrNone(`SELECT * FROM users WHERE username = $1`, [username]);
            return {user1, user2}
        })
        .then(data => {
            if (data.user1.length !== 0) {
                return res.status(401).json("Username already exists!");
            } 
            
            if (data.user2.length !== 0) {
                return res.status(401).json("Email already exists!");
            }

        })
        .catch(error => {
            console.error(error.message);
        });

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // Insert new user
        db.one(
        `INSERT INTO users (
            id, 
            username, 
            email,
            password
            ) VALUES (
                $1,
                $2,
                $3,
                $4
            ) RETURNING username`,
            [
                uuidv4(),
                username,
                email,
                bcryptPassword
            ]
        )
        .then(data => {
            const username = data.username;
            const token = jwtGenerator(username);
            res.status(200).json({ token, username });
        })
        .catch(error => {
            console.error(error.message);
            res.status(500).json("Insertion fail possible server error");
        });
        
    } catch (err) {
        console.error(err.message);

        // Post failure
        res.status(500).json("Server error: Check your internet connection!");
    }
});

// Login
router.post("/login", validator, async (req, res) => {
    try {
        const { username, password } = req.body;
        db.tx(async t => {
            const user = await t.manyOrNone(`SELECT * FROM users WHERE username = $1`, [username]);
            return {user}
        })
        .then(data => {
            if (data.user.length === 0) {
                return res.status(401).json("Invalid username");
            } 
            const validPassword = bcrypt.compare(password, data.user[0].password);

            if (!validPassword) {
                return res.status(401).json("Invalid password");
            }

            const username = data.user[0].username;
            const token = jwtGenerator(username);
            res.json({ token, username });
        })
        .catch(error => {
            console.error(error.message);
            res.status(500).json("Token failure possible server error"); 
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error: Check your internet connection");
    }
});

module.exports = router;