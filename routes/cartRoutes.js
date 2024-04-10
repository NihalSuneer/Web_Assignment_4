const express = require("express");
const router = express.Router();
const Cart = require("../model/Cart");

router.post("/", async (req, res) => {                // Create a new cart for the user if it doesn't exist already
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {               // Get all carts in the database
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/user/:id", async (req, res) => {           //get all carts of a user with given id
  try {
    const carts = await Cart.find({ userId: req.params.id });
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getCart, (req, res) => {             // Get a specific cart by using ID
  res.json(res.cart);
});

router.post("/:id", getCart, async (req, res) => {        //add additional  product to an existing cart
  res.cart.products.push(req.body);
  try {
    const updatedCart = await res.cart.save();
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getCart, async (req, res) => {            //delete a cart by ID
  try {
    await res.cart.deleteOne();
    res.json({ message: "Cart deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCart(req, res, next) {
  let cart;
  try {
    cart = await Cart.findById(req.params.id);
    if (cart == null) {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.cart = cart;
  next();
}

module.exports = router;
