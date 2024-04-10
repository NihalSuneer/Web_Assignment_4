const express = require("express");
const router = express.Router();
const Comment = require("../model/Comment");

router.post("/", async (req, res) => {                          // post a new comment
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {                           // retrives all the available comments
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getComment, (req, res) => {                // Get a specific comment by using ID
  res.json(res.comment);
});

router.get("/product/:id", async (req, res) => {                //get all the available  comments by product ID
  try {
    const comments = await Comment.find({ productId: req.params.id });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", getComment, async (req, res) => {        //update a specific comment by ID
  if (req.body.content != null) {
    res.comment.content = req.body.content;
  }
  try {
    const updatedComment = await res.comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getComment, async (req, res) => {       //delete a specific comment by usingID
  try {
    await res.comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Middleware to get comment by ID
async function getComment(req, res, next) {
  let comment;
  try {
    comment = await Comment.findById(req.params.id);
    if (comment == null) {
      return res.status(404).json({ message: "Comment not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.comment = comment;
  next();
}

module.exports = router;
