var express = require("express");
var router = express.Router();

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now().toString());
//   next();
// }); // demo sake

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.status(200).render("pages/index", {
  //   title: "Welcome to the Ecommerce API",
  // });
  res.status(200).json({
    message: "Welcome to the Ecommerce API",
  });
});

module.exports = router;
