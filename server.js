"use strict";

var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");

var cors = require("cors");
const bodyParser = require("body-parser");

var app = express();

// Basic Configuration
var port = process.env.PORT || 3000;

/** this project needs a db !! **/

// mongoose.connect(process.env.DB_URI);
mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

//regular expression that checks for url format ///

const regExp = /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

//****************** needs to check and update mongodb //

const getShorty = (longUrl) => {
  const shortUrl = null;
  
  return shortUrl;
};

app.post("/api/shorturl/new", (req, res, next) => {
  const original_url = req.body.url;
  console.log("you are here");
  if (regExp.test(original_url) === false) {
    console.log(regExp.test(original_url));
    throw new Error('invalid URL');
    next(err);
  }
  console.log(regExp.test(original_url));
  const short_url = getShorty(original_url);
  res.json({
    original_url: original_url,
    short_url: short_url,
  });
});

app.use((err, req, res, next) => {
  res.status(404);
  res.json({ error: err.message });
});

app.listen(port, function () {
  console.log("Node.js listening ...");
});
