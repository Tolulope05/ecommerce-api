const express = require("express");
const router = express.Router();
const Order = require("../models/order_model");
const authenticate = require("../middleware/auth");

// middleware that is specific to this router
router.use(authenticate.auth);

// order a product

router.post("/", async (req, res) => {
  try {
    const order = new Order({
      product: req.body.product,
      quantity: req.body.quantity,
      user: req.user._id,
    });
    await order.save();
    res.send(order);
  } catch (error) {
    res.json({ message: error, success: false });
  }
});

// get all orders

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("product").populate("user");
    res.send(orders);
  } catch (error) {
    res.json({ message: error, success: false });
  }
});

// get a specific order

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("product")
      .populate("user");
    res.send(order);
  } catch (error) {
    res.json({ message: error, success: false });
  }
});

// update a specific order

router.patch("/:id", async (req, res) => {
  try {
    const order = await Order.updateOne(
      { _id: req.params.id },
      {
        $set: {
          product: req.body.product,
          quantity: req.body.quantity,
          user: req.user._id,
        },
      }
    );
    res.send(order);
  } catch (error) {
    res.json({ message: error, success: false });
  }
});

// delete a specific order

router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.deleteOne({ _id: req.params.id });
    res.send(order);
  } catch (error) {
    res.json({ message: error, success: false });
  }
});

// export the router
module.exports = router;
