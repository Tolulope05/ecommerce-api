const productSchema = new mongoose.Schema({
  title: String, // { type: String, required: true, minlength: 3, maxlength: 255 },
  price: Number, // { type: Number, required: true, min: 0 },
  description: String, // { type: String, required: true, minlength: 3, maxlength: 255 },
  imageUrl: String, // { type: String, required: true, minlength: 3, maxlength: 255 },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
