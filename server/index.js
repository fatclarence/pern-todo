const express = require("express");
// Middleware - Allow web app to make calls to our APIs
const cors = require("cors");
const pool = require("./db");

// Run the express library 
const app = express();
app.use(cors());
app.use(express.json());

// ROUTES 

// Create a todo
app.post("/todos", async(req, res) => {
    try {
        const { description } = req.body;

        // need to await some time for database results to be fetched 
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *", 
            [description]
        );
        
        res.json(newTodo.rows[0]);
    } catch(err) {
        console.error(err.message);
    }
});

// Get all todo
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todos");
        res.json(allTodos.rows);
    } catch(err) {
        console.error(err.message);
    }
});

// Get a todo

// Update a todo 

// Delete a todo


app.listen(5000, () => {
    console.log("Server has started on port 5000");
});

