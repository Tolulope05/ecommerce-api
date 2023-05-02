const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 255 },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true, minlength: 3, maxlength: 255 },
  imageUrl: { type: String, required: true, minlength: 3, maxlength: 255 },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
