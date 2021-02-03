/**
 * controllers/Cellar.js - Cellar controller
 */

/**
 * Model import
 */
const Cellar = require("../models/Cellar");

const cellar = {
  getCellar: (req, res) => {
        Cellar.find({"_id":req.body._Id}, (err, data) =>{
      if (err) {
        res.send(err);
      } else {
        res.json({
            cellar: data[0].product,
        });
      }
    });
  },
  modifyProduct: (req, res) => {
      Cellar.updateOne({"_id":req.body._Id},{"product":req.body.product},(err,data)=>{
        if (err){
            res.send(err);
        }else{
            res.json({
                data:data,
            });
        };
    });
  },
  addProduct:(req,res)=>{
    console.log(req.body)
    const body=req.body.product;
    const product={
      "cellar":body.cellar,
      "shelf":body.shelf,
      "position":body.position,
      "registrationDate":body.registrationDate,
      "color":body.color,
      "region":body.region,
      "appellation":body.appellation,
      "vintage":body.vintage,
      "winery":body.winery,
      "miniAppogee":body.miniAppogee,
      "maxiAppogee":body.maxiAppogee,
      "grape":body.grape,
      "purchasePrice":body.purchasePrice,
      "purchasePlace":body.purchasePlace,
      "sellingPrice":body.sellingPrice,
      "score":body.score,
      "comment":body.comment,
      "picture":body.picture,
      "deletionDate" :body.deletionDate,
      "consumptionDate":body.consumptionDate,
      "bottleType":body.bottleType,
      "organic"  :body.organic
    };
    Cellar.updateOne({"_id":req.body._Id}, {$push: {"product":product}},(err,data)=>{
        if (err){
            res.send(err);
        }else{
            res.json({
                data:data,
            });
        };
    });
  }
}
module.exports = cellar;