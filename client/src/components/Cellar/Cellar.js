/**
 * Cellar.js : Page de visualisation de la cave
 */
import React,{useEffect,useState}from 'react';
import './style.scss';
import { Redirect } from "react-router-dom";
import tinyComponents from '../../assets/tinyComponents';
import caroussel from '../../assets/carousels';
import recap from '../../assets/bottleRecap';
import modal from '../../assets/modalDetail';
import fetchData from '../../lib/fetch';
import dataControl from '../../lib/dataControl';


function Cellar(props) {

  const [cellar,setCellar] = useState([]);
  const [productByCellarList,setProductByCellarList] = useState([]);
  const [productList,setProductList] = useState([]);  
  const [name,setName] = useState('');

  const [redirectionLogout,setRedirectionLogout] = useState(false);

  const [toggledModal,setToggledModal]=useState(false);
  const [modalType,setModalType]=useState();
  const [rowData,setRowData]=useState({});


  /**
   * @useEffect
   */
  useEffect(() => {
      getProduct();
    },[]);

  /**
   *@function getProduct :Récupération des données API * keep data from API
  */
  function getProduct(){     
        fetchData.fetchData("POST", "/api/cellar", {}, true).then(
            (result) => {
              console.log(result)
              setName(result.name);
              if(result.cellar.length===0){
                let umptyData=dataControl.umptyProductList()
                setCellar(umptyData[0]);
                setProductByCellarList(umptyData[1]);
              }else{
                let fullData=dataControl.productList(result);
                setCellar(fullData[0]);
                setProductByCellarList(fullData[1]);
                setProductList(fullData[2]);
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
  
  /**
   * @function modalControl : 
   * @param booleanValue : Valeur booleenne
   */
  function modalControl(booleanValue){
    setToggledModal(booleanValue);
  };

  /**
   * @function handleRowData : Enregistrement de l'objet de données sélectionné *
   * @param row : Objet de données *
   */
  function handleRowData(row){
    setRowData(row);
  };

  /**
   * @function handleData : Récupération des données
   * @param e 
   */
  function handleData(e){
    if(e.target.name==="organic"){
      setRowData({...rowData,[e.target.name]:!rowData.organic});
    }else{
      setRowData({...rowData,[e.target.name]:e.target.value});
    }
   
  };

  /**
   * @function fetchToApi : Envoie des données vers l'Api *
   * @param fetchRouter : Chemin de la requète *
   * @param dataToApi : Données à tranférer *
   */
  function fetchToApi(fetchRouter,dataToApi){
    fetchData.fetchData("POST", "/api/" + fetchRouter, {product:dataToApi}, true).then(
        (dataFromApi) => {
          console.log("ok");
        },
        (error) => {
         console.log(error)
        }
    );
};
  /**
   * @function importXlFile : Déconnexion * Logout
   * @param e : event * event
   */
  function importXlFile(e){
    e.preventDefault();
    let formData = new FormData(e.target);    
    fetchData.fetchDataForm("POST", "/api/import", formData, true).then(
      (data) => {
          console.log(data)
          },
      (error) => {
        console.error("An error has occured while fetching posts");
      }
    );
    };

  /**
   *@function logout : Déconnexion * Logout
  */    
  function logout(){
  if(redirectionLogout){
      fetchData.fetchData("POST", "/api/signOut", {}, true).then(
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

  /**
   *@function cellarChoise : Affichage des caves
   * @param {*} e 
   */
  function cellarChoise(e){
    alert("changement de cave")
  };

  /**
   * @method bottleDetailModal : Lance et gère la modale de détail *
   * @param toggledModal : Etat d'affichage de la modale *
   */
  const bottleDetailModal=(toggledModal)=>{
    if(toggledModal){      
      return modal.bottleDetail(rowData,toggledModal,modalControl,handleClose,handleData)
    };
    /**
     * @function handleClose : Commande de fermeture de la modale *
     * @param value : Valeur attribuée pour chaque action à lancer *
     */
    function handleClose(value){
      if(value<=2){
        setToggledModal(false);
      }else{
        productList.forEach((element,index)=>{
          if(element._id===rowData._id){
            productList[index]=rowData;
            return
          }
        })
        fetchToApi("modify",productList);
        setToggledModal(false);
        getProduct();       
      };      
    };
  };

    return (
      <div className="cellarContainer"
      style={{backgroundImage:"url(images/cave.jpg)"}}
      >
        {logout()}
        {bottleDetailModal(toggledModal)}
        <div className="topContainer">
          <div className="cellarTitle">
            <h1 style={{fontSize:"30px"}}>Ma Cave à Vin</h1>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",alignItems: "baseline"}}>
              {recap.bottleRecap(productList,"35px")}
              <div className="cellarDisconnectionButton">
                {tinyComponents.logOut(name, setRedirectionLogout)}
              </div>
            </div>            
          </div>
        </div>    
        <div className="cellarCarousel">
            {caroussel.cellar(cellar,productByCellarList,handleRowData,cellarChoise,modalControl)}
        </div>
        <div className="importConatiner" style={{display:"flex",backgroundColor:"blue",position: "fixed",top: "81px"}}>
            <form className="containtFormulaire" onSubmit={(e)=>importXlFile(e)}>
              <input
              type="file"
              name="xlFile"
              placeholder="Societé..."
              />
              <input
              type="submit"
              value="Confirmer"
              id="submit_but"
              />
            </form>
          </div>    
      </div>
    );
}

export default Cellar;