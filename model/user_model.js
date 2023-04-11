const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  emailAddress: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  //   balance: {
  //     type: Number,
  //     required: true,
  //     default: 0,
  //   },
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
