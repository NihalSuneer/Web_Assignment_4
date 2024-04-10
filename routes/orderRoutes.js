const express = require("express");
const router = express.Router();
const Order = require("../model/Order");

router.post("/", async (req, res) => {              // Creating a new order
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {                 // Get all the available orders
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getOrder, (req, res) => {          // Get an specific order by ID
  res.json(res.order);
});

async function getOrder(req, res, next) {
  let order;
  try {
    order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Order is not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.order = order;
  next();
}

module.exports = router;
