"use strict";

var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");

var cors = require("cors");
const bodyParser = require("body-parser");
const dns = require("dns");

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

const regExp = /^(?:http[s]?:\/\/)([\w]+[\w\.-]*)[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.%]*$/i;

const validateUrl = (original_url) => {
  let host = null;
  if (regExp.test(original_url)) {
    host = original_url.match(regExp);
  } else {
    console.log("invalid URL");
    return false;
  }
  console.log(host);
  dns.lookup(host[1], (err, address, family) => {
    if (err) {
      console.log("invalid host");
      return false;
    } else {
      console.log("address:", address);
      return true;
    }
  });
};

//****************** needs to check and update mongodb ******//

const Schema = mongoose.Sche

const getShorty = (longUrl) => {
  const shortUrl = null;
  if (/\/$/.test(longUrl)) {
    longUrl = longUrl.slice(0, -1);
  }

  return shortUrl;
};

//*****POST request********//

app.post("/api/shorturl/new", (req, res, next) => {
  const original_url = req.body.url;
  console.log("post request received");
  if (validateUrl(original_url) === false) {
    throw new Error("invalid URL");
    next(err);
  } else {
    const short_url = getShorty(original_url);
    res.json({
      original_url: original_url,
      short_url: short_url,
    });
  }
});

app.use((err, req, res, next) => {
  res.status(404);
  res.json({ error: err.message });
});

app.listen(port, function () {
  console.log("Node.js listening ...");
});
