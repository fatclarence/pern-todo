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
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch(err) {
        console.error(err.message);
    }
});

// Get a todo
app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
        );

        // Just grab the first item in the rows returned
        res.json(todo.rows[0]);
    } catch(err) {
        console.error(err.message);
    }
});

// Update a todo specified by its id
app.put("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [
                description,
                id
            ]
        );

        res.json("Todo number " + id + " updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json("Todo " + id + " was deleted!");
    } catch (err) {
        console.error(err.message);
    }

});

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});

