const express = require("express");
const router = express.Router();
const User = require("../models/user_model");

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({
      error: "Login failed! Check authentication credentials",
      message: error.message,
    });
  }
});

// register user
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({
      error: "Registration failed!",
      message: error.message,
    });
  }
});

// logout user
router.post("/logout", async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    // res.status(500).send(error.message);
    res.status(500).send({
      error: "Logout failed!",
      message: error.message,
    });
  }
});

module.exports = router;
