/**
 * routes/index.js - Main router file
 */

/**
 * Module Imports
 */
const express = require("express");
const router = express.Router();
/**
 *Controller import
 */
const posts = require("../../controllers/posts");

/**
 * Routes
 */
//GET all posts

router.get("/posts", posts.getPosts);


module.exports = router;
