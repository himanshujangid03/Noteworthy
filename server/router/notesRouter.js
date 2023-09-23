const express = require("express");
const notesController = require("../controller/notesController");

const router = express.Router();

router.route("/").get(notesController.getNotes);

module.exports = router;
