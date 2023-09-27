const Note = require("../model/noteModal");
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

  res.status(201).json({ status: "success" });
});

exports.getNote = catchAsync(async (req, res, next) => {
  const note = await Note.find({ userId: req.user._id });

  res.status(201).json(note);
  next();
});
