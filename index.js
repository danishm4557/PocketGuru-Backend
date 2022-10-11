const express = require("express");
const app = express();
let cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
bodyParser = require('body-parser');



///////////////////////// SET UP CORS ////////////////////////////
const allowedList = ['http://localhost:3000', 'https://pocket-guru.vercel.app/', 'https://pocket-guru-backend.herokuapp.com/']
const corsOptions = {
	origin: (origin, callback) => {
		if(allowedList.indexOf(origin) !== -1 || !origin) {
		  callback(null, true)
		} else {
		  callback(new Error('Not allowed by CORS'))
		}
	},
	credentials: true
}
//////////////////////////////////////////////////////////////////


app.use(cors(corsOptions));



/////// Setting up basic middleware for all Express requests ///////
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
//////////////////////////////////////////////////////////////////



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
  console.log("Mongo Connected to " + PORT);
});
db.on("disconnected", () => {
  console.log("Mongo Disconnected");
});
//////////////////////////////////////////////////////////////////



app.get("/", (req, res) => {
  res.send("Database Working for Notes");
});



///////////////////////// USE NOTES ROUTE/////////////////////////
app.use('/note', require('./controllers/Notes'));
//////////////////////////////////////////////////////////////////



app.listen(PORT, () => {
  console.log("Server Working");
});
