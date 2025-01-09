const Post = require("../models/post.js");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.findById(id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, height, location, time } = req.body;

    // Pastikan `req.user` sudah ada, yang di-set oleh middleware verifyToken
    if (!req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const author = req.user.username; // Ambil `username` dari token

    // Membuat Post baru dengan author diisi
    const newPost = new Post({
      title,
      content,
      height,
      location,
      time,
      author, // `author` diisi dengan username dari token
    });

    await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.findByIdAndUpdate(id, req.body);
    if (!posts) {
      return res.status(404).json({ message: "Post not Found!" });
    }

    const updatedPost = await Post.findById(id);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.findByIdAndDelete(id);
    if (!posts) {
      return res.status(404).json({ message: "Post not Found!" });
    }
    res.status(200).json({ message: "Post Deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const posts = await Post.find({ author: req.user.username }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
};
