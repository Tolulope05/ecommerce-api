const express = require("express");
const router = express.Router();
const Payment = require("../models/payment_model");
const Order = require("../models/order_model");
const authenticate = require("../middleware/auth");

// middleware that is specific to this router
router.use(authenticate.auth);

// get all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.send(payments);
  } catch (error) {
    res.json({ message: error, success: false });
  }
});

// get a specific payment
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    res.send(payment);
  } catch (error) {
    res.json({ message: error, success: false });
  }
});

// make a payment
router.post("/", async (req, res) => {
  try {
    const payment = new Payment({
      user: req.user._id,
      paymentMethod: req.body.payment_method,
      order: req.body.order_id,
      paymentResult: {
        id: payment_status.id,
        status: payment_status.status,
        update_time: payment_status.update_time,
        email_address: payment_status.payer.email_address,
      },
      amount: req.body.amount,
      reference: req.body.reference,
      isPaid: true,
      paidAt: Date.now(),
    });
    payment.save();

    // update order status
    const updateStatus = await Order.findByIdAndUpdate(req.body.order_id, {
      $set: { status: "paid" },
    });
    res.json(updateStatus); // return the updated order
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
