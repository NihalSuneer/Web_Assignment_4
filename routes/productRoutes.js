const express = require("express");
const router = express.Router();
const Product = require("../model/Product");

router.post("/", async (req, res) => {                // post new Product
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {                 // Get all the available products
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", getProduct, async (req, res) => {    // Updates the product by using the ID
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.image != null) {
    res.product.image = req.body.image;
  }
  if (req.body.discount != null) {
    res.product.discount = req.body.discount;
  }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  if (req.body.description != null) {
    res.product.description = req.body.description;
  }
  if (req.body.shippingCost != null) {
    res.product.shippingCost = req.body.shippingCost;
  }
  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getProduct, async (req, res) => {         //deletes the product by using the ID
  try {
    await res.product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getProduct(req, res, next) {   
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

module.exports = router;
