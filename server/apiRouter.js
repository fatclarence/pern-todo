const express = require("express");
const todosRouter = require("./routes/todosRouter");
const authRouter = require("./routes/authRouter");

const apiRouter = express.Router();

// Include routes to backend here
apiRouter.use("/todos", todosRouter);

apiRouter.use("/auth", authRouter);

module.exports = apiRouter;