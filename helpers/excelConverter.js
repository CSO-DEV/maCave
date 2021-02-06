const excelToJson=require("convert-excel-to-json");
const path = require('path')
const xlConverter = {
    excelToJson: (req, res, next) => {
        console.log(req.body.xlFile);
        //let importSourceFile=req.body.xlFile;
        //let importSourceFile="C:/CSO-DEV/Eddy/liste.xlsx";
        let importSourceFile=path.resolve(__dirname, "liste_1612619031951.xlsx")
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
                    c:"position",
                    D:"registrationDate",
                    E:"color",
                    F:"region",
                    G:"appellation",
                    H:"vintge",
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
                    T:"comsumptionDate",
                    U:"bottleType",
                    V:"organic",
                }
            }]
        });
        res.json({
            converter: excelData,
            path: path.resolve(__dirname, "liste_1612619031951.xlsx"),
          });
  }
}
  module.exports = xlConverter;