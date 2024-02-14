const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");

exports.updateUser = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const newUser = await User.findOneAndUpdate(userId, {
    avatar: req.body.avatar,
    avatarId: req.body.avatarId,
  });
  newUser.save();

  res.status(201).json({ status: "success" });
});
