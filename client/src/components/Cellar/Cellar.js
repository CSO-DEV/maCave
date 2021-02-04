/**
 * Cellar.js : Page de visualisation de la cave
 */
import React,{useEffect,useState}from 'react';
import './style.scss';
import tinyComponents from '../../assets/tinyComponents';
import caroussel from '../../assets/carousels';
import fetchData from '../../lib/fetch'

function Cellar(props) {

    const [cellar,setCellar] = useState([]);
    const [products,setProducts] = useState([]);
    /**
     * @useEffect
     */
    useEffect(() => {
        getProduct();
      },[]);

    /**
     *@method getProduct :
     */
    const getProduct=()=>{     
          fetchData("POST", "/api/cellar", {}, true).then(
              (result) => {
                //console.log(result.cellar);    
                let [cellarList,shelfbyCellarList,productsList]=[[],[],[]];
                result.cellar.forEach(element => {
                  cellarList.push(element.cellar);
                  shelfbyCellarList.push("Cave"+element.cellar+"Clayette"+element.shelf);
                });
                let uniqCellarList = [...new Set(cellarList.sort())];
                let uniqShelfbyCellarList = [...new Set(shelfbyCellarList.sort())];                
                uniqCellarList.forEach((cellar,cellarIndex)=>{
                  productsList.push({"cellar":cellar,"cellarContent":[]})
                  let nbShelf=0;
                    uniqShelfbyCellarList.forEach(shelf=>{
                      if(shelf.includes("Cave" + cellar)){
                        nbShelf=+1;
                        productsList[cellarIndex].cellarContent.push({"shelf":nbShelf, shelfContent:[{"front":[]},{"back":[]}]});
                        result.cellar.forEach((element,index) => {
                          if(element.cellar===cellar && element.shelf===nbShelf && element.position==="back"){
                            productsList[cellarIndex].cellarContent.forEach(el=>{
                              el.shelfContent[1].back.push(element)
                            })
                          };
                          if(element.cellar===cellar && element.shelf===nbShelf && element.position==="front"){
                            productsList[cellarIndex].cellarContent.forEach(el=>{
                              el.shelfContent[0].front.push(element)
                            });
                          };
                        });
                      };                    
                    });                  
                });
                setCellar(uniqCellarList);
                setProducts(productsList);

                },
              (error) => {
                console.error("An error has occured while fetching posts");
                alert("Votre connection a expiré, veuillez vous reconnecter")
              }
            ); 
    };
    //console.log(products);
    //console.log(cellar);
    const cellarList=["Cave 1","Cave 2"];
    const products1 = [
      {
        cellar:1,
        cellarContent:[
          {
            shelf:1,
            shelfContent:[
              {
                front:[
                  {
                    appellation: "Corton Charlemagne",
                    bottleType: "BOUTEILLE 75CL",
                    cellar: 1,
                    color: "rouge",
                    comment: "GRAND CRU BTL 128/1300",
                    consumptionDate: "",
                    deletionDate: "",
                    grape: "",
                    maxiAppogee: "",
                    miniAppogee: "",
                    organic: false,
                    picture: "",
                    position: "front",
                    purchasePlace: "CAVE ANTIBES",
                    purchasePrice: 68,
                    region: "BOURGOGNE",
                    registrationDate: "02/02/2021",
                    score: 5,
                    sellingPrice: 68,
                    shelf: 1,
                    vintage: 2016,
                    winery: "MALDANT - PAUVELOT",
                    _id: "60196e9bf0106f447ca01ea1",
                  },
                  {
                    appellation: "CORTON CHARLEMAGNE",
                    bottleType: "BOUTEILLE 75CL",
                    cellar: 1,
                    color: "rose",
                    comment: "GRAND CRU BTL 128/1300",
                    consumptionDate: "",
                    deletionDate: "",
                    grape: "",
                    maxiAppogee: "",
                    miniAppogee: "",
                    organic: false,
                    picture: "",
                    position: "front",
                    purchasePlace: "CAVE ANTIBES",
                    purchasePrice: 68,
                    region: "BOURGOGNE",
                    registrationDate: "02/02/2021",
                    score: 5,
                    sellingPrice: 68,
                    shelf: 1,
                    vintage: 2016,
                    winery: "MALDANT - PAUVELOT",
                    _id: "60196e9bf0106f447ca01ea2",
                  }
                ],
                back:[
                  /*{
                    appellation: "CORTON CHARLEMAGNE",
                    bottleType: "BOUTEILLE 75CL",
                    cellar: 1,
                    color: "rouge",
                    comment: "GRAND CRU BTL 128/1300",
                    consumptionDate: "",
                    deletionDate: "",
                    grape: "",
                    maxiAppogee: "",
                    miniAppogee: "",
                    organic: false,
                    picture: "",
                    position: "back",
                    purchasePlace: "CAVE ANTIBES",
                    purchasePrice: 68,
                    region: "BOURGOGNE",
                    registrationDate: "02/02/2021",
                    score: 5,
                    sellingPrice: 68,
                    shelf: 1,
                    vintage: 2016,
                    winery: "MALDANT - PAUVELOT",
                    _id: "60196e9bf0106f447ca01ea3",
                  }*/
                ],
              },
            ],
          },
          {
            shelf:2,
            shelfContent:[
              {
                front:[
                  {
                    appellation: "CORTON CHARLEMAGNE",
                    bottleType: "BOUTEILLE 75CL",
                    cellar: 1,
                    color: "rouge",
                    comment: "GRAND CRU BTL 128/1300",
                    consumptionDate: "",
                    deletionDate: "",
                    grape: "",
                    maxiAppogee: "",
                    miniAppogee: "",
                    organic: false,
                    picture: "",
                    position: "front",
                    purchasePlace: "CAVE ANTIBES",
                    purchasePrice: 68,
                    region: "BOURGOGNE",
                    registrationDate: "02/02/2021",
                    score: 5,
                    sellingPrice: 68,
                    shelf: 2,
                    vintage: 2016,
                    winery: "MALDANT - PAUVELOT",
                    _id: "60196e9bf0106f447ca01ea4",
                  }
                ],
                back:[
                  {
                    appellation: "CORTON CHARLEMAGNE",
                    bottleType: "BOUTEILLE 75CL",
                    cellar: 1,
                    color: "rouge",
                    comment: "GRAND CRU BTL 128/1300",
                    consumptionDate: "",
                    deletionDate: "",
                    grape: "",
                    maxiAppogee: "",
                    miniAppogee: "",
                    organic: false,
                    picture: "",
                    position: "front",
                    purchasePlace: "CAVE ANTIBES",
                    purchasePrice: 68,
                    region: "BOURGOGNE",
                    registrationDate: "02/02/2021",
                    score: 5,
                    sellingPrice: 68,
                    shelf: 2,
                    vintage: 2016,
                    winery: "MALDANT - PAUVELOT",
                    _id: "60196e9bf0106f447ca01ea5",
                  }
                ],
              },
            ],
          },
        ]
      },

      {
        cellar:2,
        cellarContent:[
          {
            shelf:1,
            shelfContent:[
              {
                front:[
                  {
                    appellation: "CORTON CHARLEMAGNE",
                    bottleType: "BOUTEILLE 75CL",
                    cellar: 2,
                    color: "rouge",
                    comment: "GRAND CRU BTL 128/1300",
                    consumptionDate: "",
                    deletionDate: "",
                    grape: "",
                    maxiAppogee: "",
                    miniAppogee: "",
                    organic: false,
                    picture: "",
                    position: "front",
                    purchasePlace: "CAVE ANTIBES",
                    purchasePrice: 68,
                    region: "BOURGOGNE",
                    registrationDate: "02/02/2021",
                    score: 5,
                    sellingPrice: 68,
                    shelf: 1,
                    vintage: 2016,
                    winery: "MALDANT - PAUVELOT",
                    _id: "60196e9bf0106f447ca01ea6",
                  }
                ],
                back:[
                  /*{
                    appellation: "CORTON CHARLEMAGNE",
                    bottleType: "BOUTEILLE 75CL",
                    cellar: 2,
                    color: "rouge",
                    comment: "GRAND CRU BTL 128/1300",
                    consumptionDate: "",
                    deletionDate: "",
                    grape: "",
                    maxiAppogee: "",
                    miniAppogee: "",
                    organic: false,
                    picture: "",
                    position: "back",
                    purchasePlace: "CAVE ANTIBES",
                    purchasePrice: 68,
                    region: "BOURGOGNE",
                    registrationDate: "02/02/2021",
                    score: 5,
                    sellingPrice: 68,
                    shelf: 1,
                    vintage: 2016,
                    winery: "MALDANT - PAUVELOT",
                    _id: "60196e9bf0106f447ca01ea7",
                  }*/
                ],
              },
            ],
          },
          {
            shelf:2,
            shelfContent:[
              {
                front:[
                  {
                    appellation: "CORTON CHARLEMAGNE",
                    bottleType: "BOUTEILLE 75CL",
                    cellar: 2,
                    color: "rouge",
                    comment: "GRAND CRU BTL 128/1300",
                    consumptionDate: "",
                    deletionDate: "",
                    grape: "",
                    maxiAppogee: "",
                    miniAppogee: "",
                    organic: false,
                    picture: "",
                    position: "front",
                    purchasePlace: "CAVE ANTIBES",
                    purchasePrice: 68,
                    region: "BOURGOGNE",
                    registrationDate: "02/02/2021",
                    score: 5,
                    sellingPrice: 68,
                    shelf: 2,
                    vintage: 2016,
                    winery: "MALDANT - PAUVELOT",
                    _id: "60196e9bf0106f447ca01ea8",
                  }
                ],
                back:[
                  {
                    appellation: "CORTON CHARLEMAGNE",
                    bottleType: "BOUTEILLE 75CL",
                    cellar: 2,
                    color: "rouge",
                    comment: "GRAND CRU BTL 128/1300",
                    consumptionDate: "",
                    deletionDate: "",
                    grape: "",
                    maxiAppogee: "",
                    miniAppogee: "",
                    organic: false,
                    picture: "",
                    position: "front",
                    purchasePlace: "CAVE ANTIBES",
                    purchasePrice: 68,
                    region: "BOURGOGNE",
                    registrationDate: "02/02/2021",
                    score: 5,
                    sellingPrice: 68,
                    shelf: 2,
                    vintage: 2016,
                    winery: "MALDANT - PAUVELOT",
                    _id: "60196e9bf0106f447ca01ea9",
                  }
                ],
              },
            ],
          },
        ]
      },
    ]
    
    function onclick(id){
      alert(id)
    };
    function cellarChoise(e){
      alert(e.target.value)
    };

    return (
        <div className="cellarContainer"
        style={{backgroundImage:"url(images/cave.jpg)"}}
        >
            <div className="topContainer">
            <div className="cellarTitle">
                <h1>Ma Cave à Vin</h1>
                <div className="cellarDisconnectionButton">
                    {tinyComponents.logOut("nom")}
                </div>
            </div>
            </div>            
            <div className="cellarCarousel">
                {caroussel.cellar(cellar,products,onclick,cellarChoise)}
            </div>
        </div>
    );
}

export default Cellar;