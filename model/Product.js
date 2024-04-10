const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  discount: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
