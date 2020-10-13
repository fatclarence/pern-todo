const express = require("express");
// Middleware - Allow web app to make calls to our APIs
const cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 5000;
const path = require("path");
// Run the express library 
const app = express();

app.use(cors());
app.use(express.json());

// Set the environment in which our application will run in
// Heroku will be in charge of our application environment
// process.env.PORT 
// PROCESS.env.NODE_ENV => production or undefined
// This is because heroku will be in-charge of directing our request accurately to our port numnber

if (process.env.NODE_ENV === "production") {
    // server static content
    // build folder in client folder contains all the static content that we build
    // aim the index.html in it

    // app.use(express.static) => allows us to serve static content that we specify in build folder
    app.use(express.static(path.join(__dirname, "client/build")));
}

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

// Catchall
// If any other random route, client will be pointed back to index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
