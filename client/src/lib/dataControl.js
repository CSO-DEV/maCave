/**
 * inputControl.js - Contrôle de saisie des mots de passes
 */
const dataControl = {

    productList(data){
        let [cellarList,shelfbyCellarList,productsByCellarList,productList]=[[],[],[],[]];
        data.cellar.forEach(element => {  
          cellarList.push(element.cellar);
          shelfbyCellarList.push("Cave"+element.cellar+"Clayette"+element.shelf);
        });
        let uniqCellarList = [...new Set(cellarList.sort())];
        let uniqShelfbyCellarList = [...new Set(shelfbyCellarList.sort())];
        
        uniqCellarList.forEach((cellar,cellarIndex)=>{
          productsByCellarList.push({"cellar":cellar,"cellarContent":[]})
          let nbShelf=0;
         
            uniqShelfbyCellarList.forEach((shelf,shelfIndex)=>{          
              if(shelf.includes("Cave" + cellar)){
                nbShelf=parseInt(shelf.replace("Cave" + cellar + "Clayette", ""))
                productsByCellarList[cellarIndex].cellarContent.push({"shelf":nbShelf, shelfContent:[{"avant":[]},{"arriere":[]}]});
             
                data.cellar.forEach((element,index) => {  
                  if(!element.consumptionDate && !element.deletionDate){
                    if(shelf==="Cave"+element.cellar+"Clayette"+element.shelf && element.position==="Arrière"){                      
                      productsByCellarList[cellarIndex].cellarContent[shelfIndex].shelfContent[1]["arriere"].push(element);
                      productList.push(element);
                    };
                    if(shelf==="Cave"+element.cellar+"Clayette"+element.shelf && element.position==="Avant"){
                      productsByCellarList[cellarIndex].cellarContent[shelfIndex].shelfContent[0]["avant"].push(element);
                      productList.push(element);
                    };
                  };               
                });
              };                    
            });                  
        });
        return [uniqCellarList,productsByCellarList,productList];
    },

    umptyProductList(){
      return [
        [1],
      [
        { "cellar":1,
          "cellarContent":[
            {
              "shelf":1,
              "shelfContent":[
                {"Avant":[]},
                {"Arriere":[]}
              ]
            }
          ]
      
        }]
    ]
    },
    
    modifyData(productList,productByCellarList,rowData){
      productList.forEach((element,index)=>{
        if(element._id===rowData._id){
          productList[index]=rowData;
          return
        }
      });
      productByCellarList.forEach(cellarElement=>{
        if(cellarElement.cellar===rowData.cellar){
          cellarElement.cellarContent.forEach(shelfElement=>{
            if(shelfElement.shelf===rowData.shelf){
              shelfElement.shelfContent.forEach(positionElement=>{
                let position;
                if(rowData.position==="Avant"){position="avant"}else{position="arriere"};
                if(positionElement[position]){
                  positionElement[position].forEach(element=>{
                    if(element._id===rowData._id){
                      element=rowData
                    }
                  })
                }                
              })
            }
          })
        }
      });
      return[productList,productByCellarList]
    }
}

export default dataControl;