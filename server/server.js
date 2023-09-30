const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

mongoose
  .connect(
    "mongodb+srv://himanshujangid516:lfIbgMHl58A5ejVY@cluster.iegrpym.mongodb.net/noteworthy",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {});

app.listen(4000, () => {});
