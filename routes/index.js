var express = require("express");
var router = express.Router();

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now().toString());
//   next();
// }); // demo sake

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).render("pages/index", {
    title: "Tolulope Title",
    message: "Tolulope Message",
    name: "Tolulope Name",
  });
});

module.exports = router;
