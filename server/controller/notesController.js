/* eslint-disable no-unused-vars */
const Note = require("../model/noteModal");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createNote = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { title, content } = req.body;
  const newNote = await Note.create({
    userId: userId,
    title: title,
    content: content,
  });

  newNote.save();

  if (!title || !content) {
    return next();
  }

  setTimeout(() => {
    res.status(201).json({ status: "success" });
  }, 1000);
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
