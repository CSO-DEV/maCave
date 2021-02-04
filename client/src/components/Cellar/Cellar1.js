/**
 * Cellar.js : Page de visualisation de la cave
 */
import React,{useEffect,useState}from 'react';
import './style.scss';
import { Redirect } from "react-router-dom";
import tinyComponents from '../../assets/tinyComponents';
import caroussel from '../../assets/carousels';
import fetchData from '../../lib/fetch'

function Cellar(props) {

    const [cellar,setCellar] = useState([]);
    const [productList,setProductList] = useState([]);
    const [redirectionLogout,setRedirectionLogout] = useState(false);
    const [name,setName] = useState('');

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
                setName(result.name);
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
                        nbShelf=parseInt(shelf.replace("Cave" + cellar + "Clayette", ""))
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
                setProductList(productsList);
                },
              (error) => {
                console.error("An error has occured while fetching posts");
                alert("Votre connection a expiré, veuillez vous reconnecter");
                fetchData("POST", "/api/signOut", {}, true).then(
                  (data) => {
                      console.log(data)
                      },
                  (error) => {
                    console.error("An error has occured while fetching posts");
                  }
              );
              localStorage.removeItem('_IdMaCaveAVin');
              localStorage.removeItem('tokenMaCaveAVin');
              return(
                  <Redirect to="/"/>
              );
              }
            ); 
    };
    
    function onclick(row){
      alert(row.appellation)
   
    };

    function cellarChoise(e){
      alert(e.target.value)
    };

        /**
     *@method logout : Déconnexion * Logout
     */    
    const logout = () =>{
      if(redirectionLogout){
          fetchData("POST", "/api/signOut", {}, true).then(
              (data) => {
                  console.log(data)
                  },
              (error) => {
                console.error("An error has occured while fetching posts");
              }
          );
          localStorage.removeItem('_IdMaCaveAVin');
          localStorage.removeItem('tokenMaCaveAVin');
          return(
              <Redirect to="/"/>
          );            
      }; 
  };

    return (
        <div className="cellarContainer"
        style={{backgroundImage:"url(images/cave.jpg)"}}
        >
          {logout()}
            <div className="topContainer">
            <div className="cellarTitle">
                <h1>Ma Cave à Vin</h1>
                <div className="cellarDisconnectionButton">
                    {tinyComponents.logOut(name, setRedirectionLogout)}
                </div>
            </div>
            </div>            
            <div className="cellarCarousel">
                {caroussel.cellar(cellar,productList,onclick,cellarChoise)}
            </div>
        </div>
    );
}

export default Cellar;