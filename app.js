var createError = require("http-errors");
var express = require("express");
var mongoDB = require("./config/db");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authController = require("./controllers/auth");
const mongoose = require("mongoose");

// routes
var indexRouter = require("./routes/index");
var productsRouter = require("./routes/products");

// constants for the app
const port = process.env.PORT || 8800;
dotenv.config();

var app = express();

// Connect to MongoDB
mongoDB();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.json()); // create appliction/json parser
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/auth", authController);
app.use("/api", indexRouter);
app.use("/api/products", productsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("pages/error");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});

// npm run dev
