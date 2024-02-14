const Task = require("../model/taskModel");
const catchAsync = require("../utils/catchAsync");

exports.createTask = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const newTask = await Task.create({
    userId: userId,
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    updatedAt: req.body.updatedAt,
    status: req.body.status,
    priority: req.body.priority,
  });
  newTask.save();

  res.status(201).json({ status: "task created" });
});
