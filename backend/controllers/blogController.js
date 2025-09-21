const { validationResult } = require("express-validator");
const Blog = require("../models/Blog");
const User = require("../models/User");

// Create a blog
exports.createBlog = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { title, description, tags } = req.body;
    const blog = new Blog({
      title,
      description,
      tags: Array.isArray(tags)
        ? tags
        : tags
        ? tags.split(",").map((t) => t.trim())
        : [],
      author: req.user._id,
    });

    await blog.save();

    // Return blog with author info
    const createdBlog = await Blog.findById(blog._id)
      .populate("author", "name email")
      .lean();

    res.status(201).json(createdBlog);
  } catch (err) {
    next(err);
  }
};

// Get all blogs
exports.getAll = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.tag) filter.tags = req.query.tag;

    const sort = {};
    if (req.query.sort) {
      const [key, dir] = req.query.sort.split(":");
      sort[key] = dir === "desc" ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }

    const blogs = await Blog.find(filter)
      .populate("author", "name email")
      .populate("comments.user", "name email")
      .sort(sort)
      .lean();

    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

// Get a blog by ID
exports.getById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email")
      .populate("comments.user", "name email")
      .lean();

    if (!blog) return res.status(404).json({ message: "Not found" });
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

// Update a blog
exports.updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });

    if (
      String(blog.author) !== String(req.user._id) &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { title, description, tags } = req.body;
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (tags)
      blog.tags = Array.isArray(tags)
        ? tags
        : tags.split(",").map((t) => t.trim());
    blog.updatedAt = new Date();

    await blog.save();

    const updatedBlog = await Blog.findById(blog._id)
      .populate("author", "name email")
      .populate("comments.user", "name email")
      .lean();

    res.json(updatedBlog);
  } catch (err) {
    next(err);
  }
};

// Delete a blog
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });

    if (
      String(blog.author) !== String(req.user._id) &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await blog.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

// Add a comment
exports.addComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ message: "Comment text required" });

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });

    blog.comments.push({ user: req.user._id, text });
    await blog.save();

    const updatedBlog = await Blog.findById(blog._id)
      .populate("comments.user", "name email")
      .lean();

    res.status(201).json(updatedBlog);
  } catch (err) {
    next(err);
  }
};
