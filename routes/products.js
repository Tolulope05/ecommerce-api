const express = require("express");
const router = express.Router();
const Product = require("../models/product_model");
const authenticate = require("../middleware/auth");

// middleware that is specific to this router
router.use(authenticate);

// do something with the router
router.use((req, res, next) => {
  console.log("DATABASE FETCHED AT : ", Date.now().toString());
  next();
});

//get all products
router.get("/", async (req, res, next) => {
  const products = await Product.find({});
  res.send(products);
});

// post a product
router.post("/", async (req, res, next) => {
  const product = new Product(req.body);
  await product.save();
  s;
  res.send(product);
});

// get a product
router.get("/:id", async (req, res, next) => {
  Product.findById(req.params.id).then((product) => res.json(product));
});

// update a product
router.put("/:id", async (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body).then(() => {
    Product.findById(req.params.id).then((product) => res.json(product));
  });
});

// delete a product
router.delete("/:id", async (req, res, next) => {
  Product.findByIdAndDelete(req.params.id).then(() => res.sendStatus(200));
});

// export the router
module.exports = router;

/**
 * Route path: /users/:userId/books/:bookId
  Request URL: http://localhost:3000/users/34/books/8989
  req.params: { "userId": "34", "bookId": "8989" }
 */
