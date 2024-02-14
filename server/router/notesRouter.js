const express = require("express");
const notesController = require("../controller/notesController");
const authController = require("../controller/authController");
const notesFolderController = require("../controller/notesFolderController");

const router = express.Router();

router
  .route("/create-note")
  .post(authController.isLoggedIn, notesController.createNote);
router
  .route("/get-note/:id")
  .get(authController.isLoggedIn, notesController.getNote);

router
  .route("/update-note/:id")
  .patch(authController.isLoggedIn, notesController.updateNote);

router
  .route("/delete-note/:id")
  .delete(authController.isLoggedIn, notesController.deleteNote);

//* notes Folder

router
  .route("/create-folder")
  .post(authController.isLoggedIn, notesFolderController.createNotesFolder);

router
  .route("/get-folder")
  .get(authController.isLoggedIn, notesFolderController.getNotesFolder);

router
  .route("/getnotes-folder/:id")
  .get(authController.isLoggedIn, notesFolderController.getNotesFromFolder);

router
  .route("/delete-folder/:id")
  .delete(authController.isLoggedIn, notesFolderController.deleteFolder);

router
  .route("/update-folder/:id")
  .patch(authController.isLoggedIn, notesFolderController.updateFolder);

router
  .route("/get-recentfolders")
  .get(
    notesFolderController.getRecentFolders,
    notesFolderController.getNotesFolder,
  );

module.exports = router;
