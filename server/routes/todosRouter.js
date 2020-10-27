// const pool = require("../db");
const db = require("../db")
const express = require("express");
const router = express.Router();

// Create a todo
router.post("/", async(req, res) => {
    const { description } = req.body;
    db.one(`INSERT INTO todo (description) VALUES ($1) RETURNING *`, [description])
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.error(error.message);
    });

});

// Get all todo
router.get("/", async(req, res) => {
    db.manyOrNone(`SELECT * FROM todo`)
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.error(error.message);
    });
});

// Get a todo
router.get("/:id", async(req, res) => {
    const { id } = req.params;
    db.one(`SELECT * FROM todo WHERE todo_id = $1`, [id])
    .then(data => {
        res.json(data.rows[0]);
    })
    .catch(error => {
        console.log(error.message);
    });
});

// Update a todo specified by its id
router.put("/:id", async(req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    db.none(`UPDATE todo SET description = $1 WHERE todo_id = $2`, [ description, id ])
    .then(() => {
        res.json("Todo number " + id + " updated!");
    }).catch(error => {
        console.error(error.message);
    });
});

// Delete a todo
router.delete("/:id", async (req, res) => { 
    const { id } = req.params;
    db.none(`DELETE FROM todo WHERE todo_id = $1`, [id])
    .then(() => {
        res.json(id);
    })
    .catch(error => {
        console.log(error.message);
    });
});


module.exports = router;