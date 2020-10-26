const express = require("express");
const todosRouter = require("./routes/todosRouter");

// TODO: auth router
// TODO: move todos into todo router

const apiRouter = express.Router();

// Include routes to backend here
apiRouter.use("/todos", todosRouter);

module.exports = apiRouter;