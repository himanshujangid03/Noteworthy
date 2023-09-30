/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
// eslint-disable-next-line node/no-unpublished-require
const helmet = require("helmet");
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
    origin: "https://noteworthy-three.vercel.app",
  }),
);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "cross-origin-embedder-policy": "'require-corp'",
      "cross-origin-opener-policy": "'same-origin'",
    },
  }),
);
app.use("/", (req, res, next) => {
  next();
});

app.use("/note", noteRouter);
app.use("/user", userRouter);

app.use(globalErrorHandler);
module.exports = app;
