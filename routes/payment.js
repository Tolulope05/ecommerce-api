const express = require("express");
const router = express.Router();
const Payment = require("../models/payment_model");
const Order = require("../models/order_model");
const authenticate = require("../middleware/auth");

// middleware that is specific to this router
router.use(authenticate.auth);

// make a payment
router.post("/payment", async (req, res) => {
  try {
    const payment = new Payment({
      user: req.user._id,
      paymentMethod: req.body.payment_method,
      order: order_id,
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

    const savedPayment = await payment.save();
    // res.json(savedPayment);

    // update order status
    const updateStatus = await Order.updateOne(
      { _id: order_id },
      { status: "completed" }
    );
    res.json(updateStatus); // return the updated order
  } catch (error) {
    console.log(error);
  }
});

// get all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.send(payments);
  } catch (error) {
    res.json({ message: error, success: false });
  }
});
