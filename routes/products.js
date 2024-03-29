const express = require("express");
const router = express.Router();
const Product = require("../models/product_model");
const authenticate = require("../middleware/auth");

// middleware that is specific to this router
router.use(authenticate.auth);

// do something with the router
router.use((req, res, next) => {
  console.log("DATABASE FETCHED AT : ", Date.now().toString());
  next();
});

//get all products
router.get("/", async (req, res, next) => {
  const products = await Product.find({});
  res.json(products);
});

// post a product
router.post("/", async (req, res, next) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// get a product
router.get("/:id", async (req, res, next) => {
  Product.findById(req.params.id).then((product) => res.json(product));
});

// get all products of a category
router.get("/category/:id", async (req, res, next) => {
  Product.find({ category: req.params.id }).then((product) =>
    res.json(product)
  );
});

// update a product
router.put("/:id", [authenticate.checkIsAdmin], async (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body).then(() => {
    Product.findById(req.params.id).then((product) => res.json(product));
  });
});

// delete a product
router.delete("/:id", [authenticate.checkIsAdmin], async (req, res, next) => {
  Product.findByIdAndDelete(req.params.id).then(() =>
    res.json({ message: "Product deleted" })
  );
});

// export the router
module.exports = router;

/**
 * Route path: /users/:userId/books/:bookId
  Request URL: http://localhost:3000/users/34/books/8989
  req.params: { "userId": "34", "bookId": "8989" }
 */
