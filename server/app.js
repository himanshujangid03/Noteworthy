const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2");

const noteRouter = require("./router/notesRouter");
const userRouter = require("./router/userRouter");
const taskRouter = require("./router/taskRouter");
const globalErrorHandler = require("./controller/errorController");
const User = require("./model/userModel");
const bodyParser = require("body-parser");

const app = express();

app.use(helmet());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//* sessions

app.use(cookieParser());
/* 
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request on this IP address. Try again in an hour",
});
 */
/* app.use("/", limiter); */

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(
  cors({
    credentials: true,
    //origin: "https://noteworthy-zeta.vercel.app",
    origin: "http://localhost:5173",
  }),
);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "cross-origin-embedder-policy": "'require-corp'",
      "cross-origin-opener-policy": "'same-origin'",
    },
  }),
);

//* session setup
app.use(passport.initialize());
app.use(passport.session());

//* google signin route
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);

//* after google sign in redirect to home page
app.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:5173/login",
  }),
);

//* google logout
app.get("/user/google/logout", (req, res, next) => {
  req.logout(() => {
    console.log("logged out from google");
    return next();
  });
});

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/secrets",
      userProfileURL: "http://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await User.findOne({ email: profile.email });
        cb(null, user);

        if (!user) {
          const newUser = await User.create({
            name: profile.name.displayName,
            email: profile.email,
            password: profile.id,
            picture: profile.picture,
            mode: "google",
          });
          cb(null, newUser);
        }
      } catch (err) {
        cb(err);
      }
    },
  ),
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.use("/note", noteRouter);
app.use("/user", userRouter);
app.use("/task", taskRouter);

app.use(globalErrorHandler);
module.exports = app;
