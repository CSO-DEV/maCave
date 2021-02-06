/**
 * Cellar.js : Page de visualisation de la cave
 */
import React,{useEffect,useState}from 'react';
import './style.scss';
import { Redirect } from "react-router-dom";
import tinyComponents from '../../assets/tinyComponents';
import caroussel from '../../assets/carousels';
import fetchData from '../../lib/fetch'
import dataControl from '../../lib/dataControl'


function Cellar(props) {

    const [cellar,setCellar] = useState([]);
    const [productList,setProductList] = useState([]);
    const [redirectionLogout,setRedirectionLogout] = useState(false);
    const [name,setName] = useState('');
    const [xlFile,setXlFile] = useState('');

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
                if(result.cellar.length===0){
                  setCellar(dataControl.umptyProductList()[0]);
                  setProductList(dataControl.umptyProductList()[1]);
                }else{
                  setCellar(dataControl.productList(result)[0]);
                  setProductList(dataControl.productList(result)[1]);
                };

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

  const importFile=(e)=>{
    console.log({xlFile:"test"})
    fetchData("POST", "/api/import", xlFile, true).then(
      (data) => {
          console.log(data)
          },
      (error) => {
        console.error("An error has occured while fetching posts");
      }
  );
  }




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
            <div>
            <button onClick={()=>importFile()}></button>
            </div>    
        </div>
    );
}

export default Cellar;