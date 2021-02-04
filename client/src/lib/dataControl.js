/**
 * inputControl.js - Contrôle de saisie des mots de passes
 */
const dataControl = {

    productList(data){
        let [cellarList,shelfbyCellarList,productsList]=[[],[],[]];
        data.cellar.forEach(element => {  
          cellarList.push(element.cellar);
          shelfbyCellarList.push("Cave"+element.cellar+"Clayette"+element.shelf);
        });
        let uniqCellarList = [...new Set(cellarList.sort())];
        let uniqShelfbyCellarList = [...new Set(shelfbyCellarList.sort())];

        uniqCellarList.forEach((cellar,cellarIndex)=>{
          productsList.push({"cellar":cellar,"cellarContent":[]})
          let nbShelf=0;

            uniqShelfbyCellarList.forEach((shelf,shelfIndex)=>{          
              if(shelf.includes("Cave" + cellar)){
                nbShelf=parseInt(shelf.replace("Cave" + cellar + "Clayette", ""))
                productsList[cellarIndex].cellarContent.push({"shelf":nbShelf, shelfContent:[{"front":[]},{"back":[]}]});
             
                data.cellar.forEach((element,index) => {  

                  if(shelf==="Cave"+element.cellar+"Clayette"+element.shelf && element.position==="back"){ 
                    console.log(element);
                    console.log(productsList[cellarIndex].cellarContent[shelfIndex].shelfContent[1]["back"])
                    productsList[cellarIndex].cellarContent[shelfIndex].shelfContent[1]["back"].push(element)
                  };
                  if(shelf==="Cave"+element.cellar+"Clayette"+element.shelf && element.position==="front"){
                    productsList[cellarIndex].cellarContent[shelfIndex].shelfContent[0]["front"].push(element)
                  
                  };
                });
              };                    
            });                  
        });
        return [uniqCellarList,productsList];
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
                {"front":[]},
                {"back":[]}
              ]
            }
          ]
      
        }]
    ]
    }   
}

export default dataControl;