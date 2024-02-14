const express = require("express");

const authController = require("../controller/authController");
const taskController = require("../controller/taskController");

const router = express.Router();

router
  .route("/create-task")
  .post(authController.isLoggedIn, taskController.createTask);

module.exports = router;
