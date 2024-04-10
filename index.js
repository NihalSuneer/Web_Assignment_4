const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://nihalsuneeraisat:123@cluster-lab3.awe1fcu.mongodb.net/Cluster-lab3?retryWrites=true&w=majority&appName=Cluster-lab3"       // MongoDB Connection
  )
  .then(() => {
    console.log("Connected to the database!");
  });

const User = require("./model/User");                           // Defining the  Mongoose Models
const Comment = require("./model/Comment");
const Order = require("./model/Order");
const Product = require("./model/Product");
const Cart = require("./model/Cart");


const userRoutes = require("./routes/userRoutes");              // Define the Routes for the specific  models
const commentRoutes = require("./routes/commentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`server running`);
});
