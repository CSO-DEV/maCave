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
const connection = require("../../controllers/connection");
const post = require("../../controllers/posts");
const xlToJson = require('../../controllers/excelConverter');
const multer=require('../../middlewares/multer')

/**
 * Routes
 */
 router.post("/signIn", connection.signIn);
 router.post("/signOut", connection.signOut);
 router.post("/register", connection.register);

router.post("/cellar", cellar.getCellar);
router.post("/add", cellar.addProduct);
router.post("/modify", cellar.modifyProduct);
router.post("/posts", post.getPosts);

router.post("/import",multer, xlToJson.excelToJson);
module.exports = router;
