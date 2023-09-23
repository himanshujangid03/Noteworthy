const express = require("express");
const cors = require("cors");
const noteRouter = require("./router/notesRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", noteRouter);

module.exports = app;
