//import express body-parser

const express = require("express");
//import router file in server js

const router = require("./routes/router");
const recrouter = require("./routes/recruiter_routes");
const passport = require("passport");
const session = require("express-session");
//import the db model folder
const db = require("./model/index");
db.sequelize.sync();
//body-parser
require('./config/local_passport_recruiter');
const bodyparser = require("body-parser");

const app = express();

var corsOptions = {
  origin: "*",
};
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//cores options
const cors = require("cors");
app.use(cors(corsOptions));

// add port vaiable for listen port number

const port = 3000;

app.use("/", router);
app.use("/recruiter", recrouter);

//listen function

app.listen(port, (err) => {
  if (err) throw err;
  else {
    console.log("server is running on port => " + port);
  }
});
