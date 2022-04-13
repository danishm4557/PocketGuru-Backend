const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

/////////////////////// CONNECT MONGOOSE /////////////////////////
const db = mongoose.connection;
mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Database Connected");
  }
);

db.on("error", (err) => {
  console.log("Error: ", err);
});
db.on("connected", () => {
  console.log("Mongo Connected");
});
db.on("disconnected", () => {
  console.log("Mongo Disconnected");
});
//////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("Database Working");
});

app.listen(PORT, () => {
  console.log("Server Working");
});
