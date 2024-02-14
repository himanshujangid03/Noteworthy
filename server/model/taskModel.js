const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    reqruied: [true, "This field is required"],
  },
  title: {
    type: String,
    required: [true, "This field is required!"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "This field is required"],
  },
  dueDate: {
    type: Date,
    required: [true, "This field is required!"],
  },
  updatedAt: {
    type: Date,
    required: [true, "This field is required!"],
  },
  priority: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
