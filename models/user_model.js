const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  profile_pic: {
    type: String,
    default:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    // set: function (value) {
    //   return value.trim().toLowerCase();
    // },
    validate: [
      function (email) {
        return (
          email.match(
            /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
          ) != null
        );
      },
      "Invalid email",
    ],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  role: {
    type: String,
    required: true,
    enum: ["customer", "employee", "admin"],
    default: "customer",
  },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Generate JWT token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.secret);
  return token;
};

// Find user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  return user;
};

// Find user by token
userSchema.statics.findByToken = async (token) => {
  const decoded = jwt.verify(token, config.secret);
  const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
  if (!user) {
    throw new Error("Invalid token");
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
