const express = require("express");
const todosRouter = require("./routes/todosRouter");
// const authRouter = require("./routes/authRouter");

// TODO: auth router
// TODO: move todos into todo router

const apiRouter = express.Router();

// Include routes to backend here
apiRouter.use("/todos", todosRouter);

// apiRouter.use("/auth", authRouter);

module.exports = apiRouter;