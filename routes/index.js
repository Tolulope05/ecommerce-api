var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res
    .status(200)
    .render("pages/index", {
      title: "Tolulope Title",
      message: "Tolulope Message",
      name: "Tolulope Name",
    });
});

module.exports = router;
