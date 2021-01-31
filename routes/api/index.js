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
const cellar = require("../../controllers/cellar");
const post = require("../../controllers/posts");

/**
 * Routes
 */

router.post("/cellar", cellar.getCellar);
router.post("/posts", post.getPosts);

module.exports = router;
