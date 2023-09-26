/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const noteRouter = require("./router/notesRouter");
const userRouter = require("./router/userRouter");
const globalErrorHandler = require("./controller/errorController");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", (req, res, next) => {
  console.log(req.cookies);
  next();
});

app.use("/", noteRouter);
app.use("/", userRouter);

app.use(globalErrorHandler);
module.exports = app;
