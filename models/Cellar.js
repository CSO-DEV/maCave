/**
 * models/Cellar.js : Models collection cellar
 */

const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const productSchema = new mongoose.Schema({
   cellar:Number,
   shelf:Number,
   position:String,
   registrationDate:String,
   color:String,
   region:String,
   appellation:String,
   vintage:Number,
   winery:String,
   miniAppogee:String,
   maxiAppogee:String,
   grape:String,
   purchasePrice:Number,
   purchasePlace:String,
   sellingPrice:Number,
   score:Number,
   comment:String,
   picture:String,
   deletionDate : String,
   consumptionDate:String,
   bottleType:String,
   organic  :Boolean,
});
const cellarSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:{
       type: String,
       required: true,
       unique: true},
    pwd:String,
    token:String,
    product:[productSchema],
});

cellarSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Cellar", cellarSchema);