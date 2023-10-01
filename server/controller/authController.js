const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// eslint-disable-next-line
function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

  const cookieOptions = {
    expires,
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
  };

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  console.log("cookie sent");
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  createSendToken(newUser, 201, res);
  next();
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  setTimeout(() => {
    createSendToken(user, 201, res);
  }, 500);
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (!req.cookies.jwt) {
    return next(
      new AppError("You are not logged In! Please login to get access"),
    );
  }
  if (req.cookies.jwt) {
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET,
    );

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(new AppError("User does not exist!"));
    }
    req.user = currentUser;
    return next();
  }
  next();
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.status(201).json({ status: "success" });
});

exports.getUserName = catchAsync(async (req, res, next) => {
  const { name } = req.user;

  res.status(201).json({ name: name });
  next();
});
