const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
} = require("../controllers/postController.js");

const { verifyToken } = require("../middleware/authMiddleware");

router.get("/user-posts", verifyToken, getUserPosts);

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", verifyToken, createPost);

router.put("/:id", verifyToken, updatePost);

router.delete("/:id", verifyToken, deletePost);

module.exports = router;
