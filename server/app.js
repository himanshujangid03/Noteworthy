/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
// eslint-disable-next-line node/no-unpublished-require
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//const session = require("express-session");
//const passport = require("passport");
//const passportLocalMongoose = require("passport-local-mongoose");
//const GoogleStrategy = require("passport-google-oauth20").Strategy;
const noteRouter = require("./router/notesRouter");
const userRouter = require("./router/userRouter");
const globalErrorHandler = require("./controller/errorController");
//const User = require("./model/userModel");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://noteworthy-zeta.vercel.app",
    //origin: "http://localhost:3000",
  }),
);

/* app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

// Auth security

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "322552807460-uome1uj2c3hcp77v8m4u2dqlq358e78d.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate({ googleId: profile.id }, (err, user) => cb(err, user));
    },
  ),
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
  "/auth/google/",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/",
  }),
  (req, res) => {
    // Redirect to the appropriate page after successful authentication
    res.redirect("http://localhost:3000/home");
  },
); */
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "cross-origin-embedder-policy": "'require-corp'",
      "cross-origin-opener-policy": "'same-origin'",
    },
  }),
);
app.use("/", (req, res, next) => {
  next();
});

app.use("/note", noteRouter);
app.use("/user", userRouter);

app.use(globalErrorHandler);
module.exports = app;
