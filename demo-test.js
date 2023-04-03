const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8800;

// Middleware
app.use(bodyParser.json()); // create appliction/json parser
// app.use(bodyParser.urlencoded({ extended: true })); // create application/x-www-form-urlencoded parser

// console.dir(app); // find out all that make an express app

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 255 },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true, minlength: 3, maxlength: 255 },
});

const Product = mongoose.model("Product", productSchema);

app.get("/api/products", (req, res) => {
  Product.find().then((products) => res.json(products));
});

app.post("/api/products", (req, res) => {
  Product.create(req.body).then((product) => res.json(product));
});

app.get("/api/products/:id", (req, res) => {
  Product.findById(req.params.id).then((product) => res.json(product));
});

app.put("/api/products/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body).then(() => {
    Product.findById(req.params.id).then((product) => res.json(product));
  });
});

app.delete("/api/products/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id).then(() => res.sendStatus(200));
});

app.use("*", (req, res) => {
  res.send("404, page not found");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
