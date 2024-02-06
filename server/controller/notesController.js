/* eslint-disable no-unused-vars */
const NotesFolder = require("../model/folderModel");
const Note = require("../model/noteModal");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createNote = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { title, content, folderId } = req.body;
  const folder = await NotesFolder.findById({ _id: folderId });
  const { notesId } = folder;
  const newNote = await Note.create({
    userId: userId,
    title: title,
    content: content,
  });

  const insertNoteInFolder = await NotesFolder.findByIdAndUpdate(folderId, {
    notesId: [...notesId, newNote],
  });

  if (!title || !content) {
    return next();
  }
  newNote.save();

  res.status(201).json({ status: "success" });
  next();
});

exports.getNote = catchAsync(async (req, res, next) => {
  const note = await Note.find({ userId: req.user._id });

  res.status(201).json(note);
  next();
});

exports.updateNote = catchAsync(async (req, res, next) => {
  const note = await Note.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content,
  });
  res.status(201).json({ status: "success" });
  next();
});

exports.deleteNote = catchAsync(async (req, res, next) => {
  const note = await Note.findByIdAndDelete(req.params.id);

  if (!note) {
    return next(new AppError("Note does not exist!", 404));
  }

  res.status(201).json({ status: "success" });

  next();
});
