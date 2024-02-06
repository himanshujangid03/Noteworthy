const NotesFolder = require("../model/folderModel");
const Note = require("../model/noteModal");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getRecentFolders = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "- createdAt";
  req.query.fields = "name,createdAt";
  next();
};

exports.getNotesFolder = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    NotesFolder.find({ userId: req.user._id }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const notesFolder = await features.query;

  //* previous method
  /*  const notesFolder = await NotesFolder.find({
    userId: req.user._id,
  }); */
  res.status(201).json(notesFolder);

  next();
});

exports.createNotesFolder = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { name, notesId } = req.body;

  const notes = await Note.find({ _id: notesId });
  const newNotesFolder = await NotesFolder.create({
    userId: userId,
    name: name,
    notesId: notes,
  });

  if (!name || !notesId) {
    return next();
  }
  newNotesFolder.save();

  res.status(201).json({ status: "notes folder created." });
  next();
});

exports.getNotesFromFolder = catchAsync(async (req, res, next) => {
  const notesFromFolder = await NotesFolder.findById(req.params.id);

  if (!notesFromFolder) {
    return next(new AppError("Folder not found!"));
  }

  const { notesId } = notesFromFolder;

  res.status(201).json(notesId);
  next();
});

exports.updateNoteFolder = catchAsync(async (req, res, next) => {
  const folder = req.body;
  const { notesId } = folder;

  const newNote = await Note.create({
    userId: req.user._id,
    title: req.body.title,
    content: req.body.content,
  });
});
