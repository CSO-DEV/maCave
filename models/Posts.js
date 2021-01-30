/**
 * models/Posts.js - post model
 */

/**
 * Module import
 */
const mongoose = require("mongoose");

/**
 * Create post model
 */
const PostSchema = new mongoose.Schema({
  author: String,
  content: String,
});
module.exports = mongoose.model("posts", PostSchema);