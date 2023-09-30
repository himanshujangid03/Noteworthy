/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
// eslint-disable-next-line node/no-unpublished-require
const cors = require("cors");
const cookieParser = require("cookie-parser");
const noteRouter = require("./router/notesRouter");
const userRouter = require("./router/userRouter");
const globalErrorHandler = require("./controller/errorController");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://noteworthy-silk.vercel.app",
  }),
);

app.use("/", (req, res, next) => {
  res.send("Hello from the server");
  next();
});

app.use("/note", noteRouter);
app.use("/user", userRouter);

app.use(globalErrorHandler);
module.exports = app;
