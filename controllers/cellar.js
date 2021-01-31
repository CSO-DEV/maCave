/**
 * controllers/Cellar.js - Cellar controller
 */

/**
 * Model import
 */
const Cellar = require("../models/Cellar");


/**
 * Post controller
 */
const cellar = {
    getCellar: (req, res) => {
        Cellar.find({"_id":req.body._Id}, (err, data) =>{
      if (err) {
        res.send(err);
      } else {
        res.json({
            cellar: data,
        });
      }
    });
  }
}
module.exports = cellar;