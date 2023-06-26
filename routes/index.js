const express = require("express");

// routers

const formRouter = require("./form");
const authorRouter = require("./author");
const bookRouter = require("./book");

const apiRouter = express.Router();

//all controlers

apiRouter.use("/form", formRouter);
apiRouter.use("/author", authorRouter);
apiRouter.use("/book", bookRouter);

// end

module.exports = apiRouter;
