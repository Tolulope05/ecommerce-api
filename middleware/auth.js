const User = require("../models/user_model");

const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");
  try {
    // verify token
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token Not authorized");
  }
};

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username,
  }).then((user) => {
    if (!user) {
      res.status(500).send({ message: "Error fetching user from server" });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email,
    }).then((user) => {
      if (!user) {
        res.status(500).send({ message: "Error fetching user from server" });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

const checkIsCustomer = (req, res, next) => {
  User.findById(req.user.id).then((user) => {
    if (!user) {
      res.status(500).send({ message: "Error fetching user from server" });
      return;
    }

    if (user.role !== "customer") {
      res.status(403).send({ message: "Require Customer Role!" });
      return;
    }

    next();
  });
};

const checkIsEmployee = (req, res, next) => {
  User.findById(req.user.id).then((user) => {
    if (!user) {
      res.status(500).send({ message: "Error fetching user from server" });
      return;
    }

    if (user.role !== "employee") {
      res.status(403).send({ message: "Require Employee Role!" });
      return;
    }

    next();
  });
};

const checkIsAdmin = (req, res, next) => {
  User.findById(req.user.id).then((user) => {
    if (!user) {
      res.status(500).send({ message: "Error fetching user from server" });
      return;
    }

    if (user.role !== "admin") {
      res.status(403).send({ message: "Require Admin Role!" });
      return;
    }

    next();
  });
};

module.exports = {
  auth,
  checkDuplicateUsernameOrEmail,
  checkIsCustomer,
  checkIsEmployee,
  checkIsAdmin,
};
