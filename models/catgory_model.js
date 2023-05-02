const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 255 },
  description: { type: String, required: true, minlength: 3, maxlength: 255 },
  imageUrl: { type: String, required: true, minlength: 3, maxlength: 255 },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
