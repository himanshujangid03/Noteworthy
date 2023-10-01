const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../model/userModel");
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
  };

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  console.log("cookie sent!");
  console.log(user);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  createSendToken(newUser, 201, req, res);
  next();
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  createSendToken(user, 201, res);
  next();
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET,
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      req.user = currentUser;
      console.log(currentUser);
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.logout = async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
    secure: true,
  });
  res.status(201).json({ status: "success" });
};

exports.getUserName = async (req, res, next) => {
  console.log(req.user);
  const { name } = req.user;

  res.status(201).json({ name: name });
  next();
};
