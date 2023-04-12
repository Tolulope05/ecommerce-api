const express = require("express");
const router = express.Router();
const Product = require("../models/product_model");

//get all products
router.get("/", async (req, res, next) => {
  const products = await Product.find({});
  res.send(products);
});

// post a product
router.post("/", async (req, res, next) => {
  const product = new Product(req.body);
  await product.save();
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

module.exports = router;

/**
 * Route path: /users/:userId/books/:bookId
  Request URL: http://localhost:3000/users/34/books/8989
  req.params: { "userId": "34", "bookId": "8989" }
 */
