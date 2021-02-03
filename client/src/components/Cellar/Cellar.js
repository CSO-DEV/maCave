/**
 * Cellar.js : Page de visualisation de la cave
 */
import React,{useEffect,useState}from 'react';
import './style.scss';
import tinyComponents from '../../assets/tinyComponents';
import caroussel from '../../assets/carousels';
import fetchData from '../../lib/fetch'

function Cellar(props) {


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
                //console.log(result);          
                  
                },
              (error) => {
                console.error("An error has occured while fetching posts");
                alert("Votre connection a expiré, veuillez vous reconnecter")
              }
            ); 
    };

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
                    appellation: "CORTON CHARLEMAGNE rouge",
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
                    _id: "60196e9bf0106f447ca01eaa",
                  },
                  {
                    appellation: "CORTON CHARLEMAGNE rose",
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
                    _id: "60196e9bf0106f447ca01eaa",
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
                    _id: "60196e9bf0106f447ca01eaa",
                  }
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
                    _id: "60196e9bf0106f447ca01eaa",
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
                    _id: "60196e9bf0106f447ca01eaa",
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
                    _id: "60196e9bf0106f447ca01eaa",
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
                    _id: "60196e9bf0106f447ca01eaa",
                  }
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
                    _id: "60196e9bf0106f447ca01eaa",
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
                    _id: "60196e9bf0106f447ca01eaa",
                  }
                ],
              },
            ],
          },
        ]
      },
    ]
    
    function onclick(id){
      console.log(id)
    };
    function cellarChoise(e){
      console.log(e.target.value)
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
                {caroussel.cellar(cellarList,products1,onclick,cellarChoise)}
            </div>
        </div>
    );
}

export default Cellar;