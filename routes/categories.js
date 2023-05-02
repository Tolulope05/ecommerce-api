const express = require("express");
const router = express.Router();
const Category = require("../models/catgory_model");
const authenticate = require("../middleware/auth");

// middleware that is specific to this router
router.use(authenticate.auth);

// create a category

router.post("/", async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
    });
    await category.save();
    res.send(category);
  } catch (error) {
    res.json({ message: error, success: false });
  }
});

// get all categories

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.json({ message: error, success: false });
  }
});

// get a specific category

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.send(category);
  } catch (error) {
    res.json({ message: error, success: false });
  }
});

// update a specific category

router.patch("/:id", async (req, res) => {
  try {
    const category = await Category.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
        },
      }
    );
    res.send(category);
  } catch (error) {
    res.json({ message: error, success: false });
  }
});

// delete a specific category

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.deleteOne({ _id: req.params.id });
    res.send(category);
  } catch (error) {
    res.json({ message: error, success: false });
  }
});

module.exports = router;
