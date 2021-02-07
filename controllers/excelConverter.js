const excelToJson=require("convert-excel-to-json");
const path = require('path');
const fs = require('fs');
const Cellar = require("../models/Cellar");
const moment=require("moment")



const xlConverter = {
    excelToJson: (req, res, next) => {
        let importSourceFile=path.resolve(__dirname, '../public',req.files.xlFile[0].filename);
        const excelData=excelToJson({    
            sourceFile:importSourceFile,
            sheets:[{
                name:"Données",
                header:{
                    rows:1
                },
                columnToKey:{
                    A:"cellar",
                    B:"shelf",
                    C:"position",
                    D:"registrationDate",
                    E:"color",
                    F:"region",
                    G:"appellation",
                    H:"vintage",
                    I:"winery",
                    J:"miniAppogee",
                    K:"maxiAppogee",
                    L:"grape",
                    M:"purchasePrice",
                    N:"purchasePlace",
                    O:"sellingPrice",
                    P:"score",
                    Q:"comment",
                    R:"picture",
                    S:"deletionDate",
                    T:"consumptionDate",
                    U:"bottleType",
                    V:"organic",
                }
            }]
        });
   
        let dataImport=[];
        excelData.Données.forEach(element => {
            let data={};
            data.cellar=parseInt(element.cellar);
            data.shelf=parseInt(element.shelf);
            element.cellar ? data.cellar=parseInt(element.cellar) : data.cellar=null;
            element.shelf ? data.shelf=parseInt(element.shelf) : data.shelf=null;
            element.position ? data.position=element.position : data.position="Avant";
            element.registrationDate ? data.registrationDate=moment(element.registrationDate).format("DD/MM/YYYY").toString() : data.registrationDate=null;
            element.color ? data.color=element.color.toLowerCase() : data.color=null;
            element.region ? data.region=element.region.toString() : data.region=null;
            element.appellation ? data.appellation=element.appellation.toString() : data.appellation=null;
            element.vintage ? data.vintage=parseInt(element.vintage) : data.vintage=null;
            element.winery ? data.winery=element.winery.toString() : data.winery=null;           
            element.miniAppogee ? data.miniAppogee=element.miniAppogee.toString() : data.miniAppogee=null;  
            element.maxiAppogee ? data.maxiAppogee=element.maxiAppogee.toString() : data.maxiAppogee=null;  
            element.grape ? data.grape=element.grape.toString() : data.grape=null;   
            element.purchasePrice ? data.purchasePrice=parseInt(element.purchasePrice) : data.purchasePrice=null;
            element.purchasePlace ? data.purchasePlace=element.purchasePlace.toString() : data.purchasePlace=null;  
            element.sellingPrice ? data.sellingPrice=parseInt(element.sellingPrice) : data.sellingPrice=null;
            element.score ? data.score=parseInt(element.score) : data.score=null;
            element.comment ? data.comment=element.comment.toString() : data.comment=null;  
            element.picture ? data.picture=element.picture.toString() : data.picture=null; 
            element.deletionDate ? data.deletionDate=moment(element.deletionDate).format("DD/MM/YYYY").toString() : data.deletionDate=null;
            element.consumptionDate ? data.consumptionDate=moment(element.consumptionDate).format("DD/MM/YYYY").toString() : data.consumptionDate=null;
            element.bottleType ? data.bottleType=element.bottleType.toString() : data.bottleType=null;  
            element.organic==="true"?data.organic=true : data.organic=false,

            Cellar.updateOne({"_id":req.query.id}, {$push: {"product":data}},(err,data)=>{
                if (err){
                    console.log("erreur");
                  //fs.unlinkSync(importSourceFile);
                    //res.send(err);
                }else{
                  console.log("ok");
                    /*res.json({
                      data:data,
                  });*/
                  //fs.unlinkSync(importSourceFile);
                };
            })
        });
        
        /*const product={
            "cellar":donnee.cellar,
            "shelf":donnee.shelf,
            "position":donnee.position,
            "registrationDate":donnee.registrationDate,
            "color":donnee.color,
            "region":donnee.region,
            "appellation":donnee.appellation,
            "vintage":donnee.vintage,
            "winery":donnee.winery,
            "miniAppogee":donnee.miniAppogee,
            "maxiAppogee":donnee.maxiAppogee,
            "grape":donnee.grape,
            "purchasePrice":donnee.purchasePrice,
            "purchasePlace":donnee.purchasePlace,
            "sellingPrice":donnee.sellingPrice,
            "score":donnee.score,
            "comment":donnee.comment,
            "picture":donnee.picture,
            "deletionDate" :donnee.deletionDate,
            "consumptionDate":donnee.consumptionDate,
            "bottleType":donnee.bottleType,
            "organic"  :donnee.organic
          };*/

          /*Cellar.updateOne({"_id":req.query.id}, {$push: {"product":product}},(err,data)=>{
              if (err){
                  console.log("erreur");
                fs.unlinkSync(importSourceFile);
                  res.send(err);
              }else{
                console.log("ok");
                  res.json({
                    data:data,
                });
                fs.unlinkSync(importSourceFile);
              };
          });*/
        res.json({
            converter: excelData,
            path: importSourceFile,
          });
        fs.unlinkSync(importSourceFile);
  }
}
  module.exports = xlConverter;