const express = require("express");
const notesController = require("../controller/notesController");
const authController = require("../controller/authController");

const router = express.Router();

router
  .route("/create-note")
  .post(authController.isLoggedIn, notesController.createNote);
router
  .route("/get-note")
  .get(authController.isLoggedIn, notesController.getNote);

module.exports = router;
