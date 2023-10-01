const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();

router
  .route("/profile")
  .use(authController.isLoggedIn)
  .get(authController.getUserName);

router.route("/login").post(authController.login);
router.route("/signup").post(authController.signup);
router.route("/logout").post(authController.logout);

module.exports = router;
