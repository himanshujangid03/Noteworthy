const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    reqruied: [true, "This field is required"],
  },
  taskName: {
    type: String,
    required: [true, "This field is required!"],
  },
  startsFrom: {
    type: Date,
    required: [true, "This field is required!"],
  },
  dueDate: {
    type: Date,
    required: [true, "This field is required!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
