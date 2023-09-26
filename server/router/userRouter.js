const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();

router.route("/profile").get(authController.isLoggedIn);

router
  .route("/login")
  .post(authController.login)
  .get(authController.isLoggedIn);
router.route("/signup").post(authController.signup);

module.exports = router;
