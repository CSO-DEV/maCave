/**
 * controllers/posts.js - posts controller
 */

/**
 * Model import
 */
const Post = require("../models/Posts");


/**
 * Module import
 */


/**
 * Post controller
 */
const posts = {
  /* Get all postS*/

    getPosts: (req, res) => {
    Post.find({}, (err, data) =>{
      if (err) {
        res.send(err);
      } else {
        res.json({
          posts: data,
        });
      }
    });
  }
}
module.exports = posts;