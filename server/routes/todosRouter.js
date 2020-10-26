const pool = require("../db");
const express = require("express");
const router = express.Router();

// Create a todo
router.post("/", async(req, res) => {
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
router.get("/", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch(err) {
        console.error(err.message);
    }
});

// Get a todo
router.get("/:id", async(req, res) => {
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
router.put("/:id", async(req, res) => {
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
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
            [id]
        );
        res.json("Todo " + id + " was deleted!");
    } catch (err) {
        console.error(err.message);
    }

});


module.exports = router;