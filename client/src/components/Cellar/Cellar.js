/**
 * Cellar.js : Page de visualisation de la cave
 */
import React,{useEffect,useState}from 'react';
import './style.scss';
import moment from 'moment';
import { Redirect } from "react-router-dom";
import tinyComponents from '../../assets/tinyComponents';
import caroussel from '../../assets/carousels';
import recap from '../../assets/bottleRecap';
import modal from '../../assets/modalDetail';
import fetchData from '../../lib/fetch';
import dataControl from '../../lib/dataControl';
import inputControl from '../../lib/inputControl'
import {GiGrapes} from "react-icons/gi";
import { Card } from 'react-bootstrap';


function Cellar(props) {

  const [cellar,setCellar] = useState([]);
  const [productByCellarList,setProductByCellarList] = useState([]);
  const [productList,setProductList] = useState([]);  
  const [name,setName] = useState('');

  const [redirectionLogout,setRedirectionLogout] = useState(false);

  const [toggledModal,setToggledModal]=useState(false);
  const [rowData,setRowData]=useState({});
  const [modalType,setModalType]=useState('');

  const [toggledAlertModal,setToggledAlertModal]=useState(false);
  const [alertModalType,setAlertModalType]=useState();

  const [config,setConfig]=useState({slider:false,importData:false,cave:false,account:false})
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
  function modalControl(booleanValue,type){
      setModalType(type);
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
   * @param e : event * event
   */
  function handleData(e){   
    if(e.target.name==="organic"){
      setRowData({...rowData,[e.target.name]:!rowData.organic});
    }else{
      setRowData(inputControl.dataholder(e,rowData));
    };            
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
          getProduct()
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
   * @param {*} e : event * event
   */
  function cellarChoise(e){
    alert("changement de cave")
  };

  /**
   * @method bottleDetailModal : Lance et gère la modale de détail *
   * @param toggledModal : Etat d'affichage de la modale *
   */
  const bottleDetailModal=(toggledModal)=>{
    if(toggledModal && modalType==="modify"){   
      return modal.bottleDetail(rowData,toggledModal,handleClose,handleData)
    };
    /**
     * @function handleClose : Commande de fermeture de la modale *
     * @param value : Valeur attribuée pour chaque action à lancer *
     */
    function handleClose(value){
      if(value<=2){
        setToggledModal(false);
      }else if(value===3){
        let data=dataControl.modifyData(productList,productByCellarList,rowData);
        setProductByCellarList(data[1]);
        fetchToApi("modify",data[0]);       
        setToggledModal(false);  
      }else if(value===4){
        setAlertModalType("consommer");
        setToggledAlertModal(true);
      }else{
        setAlertModalType("supprimer");
        setToggledAlertModal(true);
      }    
    };
  };

    /**
   * @method addProductModal : Lance et gère la modale de détail *
   * @param toggledModal : Etat d'affichage de la modale *
   */
  const addProductModal=(toggledModal)=>{
    if(toggledModal && modalType==="addProduct"){   
      return modal.addProduct(rowData,toggledModal,handleClose,handleData)
    };
    /**
     * @function handleClose : Commande de fermeture de la modale *
     * @param value : Valeur attribuée pour chaque action à lancer *
     */
    function handleClose(value){
      if(value<=2){
        setToggledModal(false);
      }else{
        fetchToApi("add",rowData);       
        setToggledModal(false);  
      }  
    };
  };


/**
 * @function alertModal : Lance et gère la modale d'alerte *
 * @param toggledAlertModal : Etat d'affichage de la modale d'alerte *
 */
  const alertModal=(toggledAlertModal)=>{
    if(toggledAlertModal){      
      return modal.alert(rowData,toggledAlertModal,handleClose,alertModalType)
    };
    /**
     * @function handleClose : Commande de fermeture de la modale *
     * @param value : Valeur attribuée pour chaque action à lancer *
     */
    function handleClose(value){
      if(value<=2){
        setToggledAlertModal(false);
      }else if(alertModalType==="supprimer"){
        rowData.deletionDate=moment(new Date()).format("DD/MM/YYYY").toString()
        let data=dataControl.modifyData(productList,productByCellarList,rowData);
        setProductByCellarList(data[1]);
        fetchToApi("modify",data[0]);       
        setToggledAlertModal(false);
        setToggledModal(false);  
      }else if(alertModalType==="consommer"){
        rowData.consumptionDate=moment(new Date()).format("DD/MM/YYYY").toString()
        let data=dataControl.modifyData(productList,productByCellarList,rowData);
        setProductByCellarList(data[1]);
        fetchToApi("modify",data[0]);       
        setToggledAlertModal(false);
        setToggledModal(false);  
      };
    };
  };


    return (
      <div className="cellarContainer"
      style={{backgroundImage:"url(images/cave.jpg)"}}
      >
        {logout()}
        {bottleDetailModal(toggledModal)}
        {alertModal(toggledAlertModal)}
        {addProductModal(toggledModal)}
        <div className="topContainer">
          <div className="cellarTitle">
            <h1>Ma Cave à Vin</h1>
            <div className='recapDisconnectContainer'>
              {recap.bottleRecap(productList,"35px")}
              <div className="cellarDisconnectionButton">
                {tinyComponents.logOut(name, setRedirectionLogout)}
              </div>
            </div>            
          </div>
        </div>
        <div className="configSlider"  id="configSlider">
          <button className="configSliderIconContainer"
          onClick={()=>{
            console.log(config.slider)
            if(!config.slider){
              document.getElementById('configSlider').style.left="0px";
              config.slider=true;
              return;
            }else{
              document.getElementById('configSlider').style.left="-385px";
              document.getElementById('cellarControll').style.height="0px";
              document.getElementById('importContainer').style.height="0px";
              document.getElementById('accountContainer').style.height="0px";
              config.slider=false;
              return;
            }
           }}><GiGrapes className="configSliderIcon"/>
          </button>
          <div className="configContainer">
            <h4>Configuration</h4>
            <Card className="cellarCard"  style={{backgroundColor:"transparent"}}>
              <button style={{backgroundColor:"transparent",border:"none",textAlign:'left'}}
                onClick={()=>{
                  if(!config.callar){
                    document.getElementById('cellarControll').style.height="300px";
                    config.callar=true;
                    return
                  }else{
                    document.getElementById('cellarControll').style.height="0px";
                    config.callar=false;
                    return               
                  }
                }}>Gestion des Caves :</button>
                <div className="cellarControll" id="cellarControll">
                  <Card>
                  <h6>Ajouter une cave :</h6>
                  <label>Nom de la cave :</label>
                  <input></input>
                  <button>Ajouter</button>
                  </Card>
                  <Card>
                  <h6>Supprimer une cave :</h6>
                  <label>Nom de la cave :</label>
                  <input></input>
                  <button>Supprimer</button>
                  </Card>
                </div>
            </Card>
            <Card className="importCard"  style={{backgroundColor:"transparent"}}>
              <button style={{backgroundColor:"transparent",border:"none",textAlign:'left'}}
              onClick={()=>{
                if(!config.importData){
                  document.getElementById('importContainer').style.height="35px";
                  config.importData=true;
                  return
                }else{
                  document.getElementById('importContainer').style.height="0px";
                  config.importData=false;
                  return               
                }
              }}>Importer des données :</button>

              <div className="importContainer" id="importContainer">        
                  <form className="containFormulaire" onSubmit={(e)=>importXlFile(e)}>
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
              </Card>
            <Card className="account"  style={{backgroundColor:"transparent"}}>
              <button style={{backgroundColor:"transparent",border:"none",textAlign:'left'}}
              onClick={()=>{
                if(!config.account){
                  document.getElementById('accountContainer').style.height="200px";
                  config.account=true;
                  return
                }else{
                  document.getElementById('accountContainer').style.height="0px";
                  config.account=false;
                  return               
                }
              }}>Votre compte :</button>

              <div className="accountContainer" id="accountContainer"> 
                <Card>
               {tinyComponents.input("Email :",{},{},"email","email","email","email@",true,"non","title",handleData,"")}
               {tinyComponents.input("Nom :",{},{},"lastname","text","lastname","",true,"non","lastname",handleData,"")}
               {tinyComponents.input("Prénom :",{},{},"firstname","text","firstname","",true,"non","firstname",handleData,"")}
                </Card>   

              </div>
            </Card>
            </div>
          </div>    
        <div className="cellarCarousel">
            {caroussel.cellar(cellar,productByCellarList,handleRowData,cellarChoise,modalControl)}
        </div>
      </div>
    );
}

export default Cellar;