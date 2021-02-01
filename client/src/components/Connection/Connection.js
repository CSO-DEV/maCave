/**
 * Cellar.js : Page de visualisation de la cave
 */
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import tinyComponents from '../../assets/tinyComponents';
import inputControl from '../../lib/inputControl';
import fetchData from '../../lib/fetch'

function Connection(props) {

    const [connectionData,setConnectionData] = useState({});
    const [redirection,setRedirection] = useState(false);


    /**
     * @method connectionSignIn : Module de connection signIn * SignIn module
     * @param setData : donnée setState * setState data
     * @param data : donnée state * state data
     */
    const connectionSignIn=(setData,data)=>{
        const InputPwdTitle="Minimum : 8 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial";
        const InputEmailTitle="";
        const type="signIn";
        /**
        * @function dataholder : Prise en compte des données saisies et contrôle des saisies * Taking into account of data entered and checking entries
        * @param e : Objet de saisie * Input object entry
        */
        function dataholder(e){
            if(e.target.type==="email" || e.target.type==="password"){
                setData(inputControl.dataholder(e,data));
            };
            if(e.target.type==="checkbox"){
                if(!data.forgottenPwd){
                    setData({...data,"forgottenPwd":true});
                }else{
                    setData({...data,"forgottenPwd":false});
                };              
            };
        };

        /**
         * @function controlData : Contrôle des données saisies
         * @param dataControl : Données saisies
         */
        function controlData(dataControl){
            let emailControl=inputControl.emailControl(dataControl.signInEmail);
            let pwdControl=inputControl.pwdControl(dataControl.signInPwd);
            if(!dataControl.signInEmail){
                alert("Veuillez saisir le champ Email");
                return;
            };
            if(!dataControl.forgottenPwd){
                if(!emailControl){
                    alert("Erreur de saisie de l'email " + InputEmailTitle);
                    return;
                };
                if(!dataControl.signInPwd){
                    alert("Veuillez saisir le champ mot de passe");
                    return;
                };
                if(!pwdControl){
                    alert("Erreur de saisie du mot de passe " + InputPwdTitle);
                    return;
                };
                fetchToApi(type,dataControl)
            }else{
                alert("Vous avez oubliez votre mot de passe => lancement modification mot de passe");
                return;  
            };
        };

        return(
            <div className="connectionSignIn">
                <h4>Je me connecte...</h4>
                {tinyComponents.input("Email :","","","signInEmail","email","signInEmail","mail@serveur.com",true,"none",InputEmailTitle,dataholder)}
                {tinyComponents.input("Mot de passe :","","","signInPwd","password","signInPwd","",true,10,InputPwdTitle,dataholder)}
                {tinyComponents.checkBox("Mot de passe oublié","","","forgotten",dataholder)}
                <Button className='connectionSignInButton'
                onClick={()=>{
                    controlData(data)
                }}>Envoyer</Button>
            </div>
        )
    };

    const connectionRegister=(setData,data)=>{
        const InputPwdTitle="Minimum : 8 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial";
        const InputEmailTitle="";
        const type="register";
        /**
        * @function dataholder : Prise en compte des données saisies et contrôle des saisies * Taking into account of data entered and checking entries
        * @param e : Objet de saisie * Input object entry
        */
        function dataholder(e){
            if(e.target.type==="email" || e.target.type==="password" || e.target.name==="lastname" || e.target.name==="firstname"){

                setData(inputControl.dataholder(e,data));
            };
            if(e.target.type==="checkbox"){
                if(!data.forgottenPwd){
                    setData({...data,"forgottenPwd":true});
                }else{
                    setData({...data,"forgottenPwd":false});
                };              
            };
        };

        /**
         * @function controlData : Contrôle des données saisies
         * @param dataControl : Données saisies
         */
        function controlData(dataControl){
            let emailControl=inputControl.emailControl(dataControl.signInEmail);
            let pwdControl=inputControl.pwdControl(dataControl.signInPwd);
            if(!dataControl.signInEmail){
                alert("Veuillez saisir le champ Email");
                return;
            };
            if(!dataControl.forgottenPwd){
                if(!emailControl){
                    alert("Erreur de saisie de l'email " + InputEmailTitle);
                    return;
                };
                if(!dataControl.signInPwd){
                    alert("Veuillez saisir le champ mot de passe");
                    return;
                };
                if(!pwdControl){
                    alert("Erreur de saisie du mot de passe " + InputPwdTitle);
                    return;
                };
                fetchToApi(type,dataControl)
            }else{
                alert("Vous avez oubliez votre mot de passe => lancement modification mot de passe");
                return;  
            };
        };

console.log(connectionData)
        return(
            <div className="connectionSignIn">
                <h4>Je crée un compte...</h4>
                {tinyComponents.input("Nom :","","","lastname","lastname","lastname","",true,"none","",dataholder)}
                {tinyComponents.input("Prénom :","","","firstname","firstname","firstname","",true,"none","",dataholder)}
                {tinyComponents.input("Email :","","","registerEmail","email","registerEmail","mail@serveur.com",true,"none",InputEmailTitle,dataholder)}
                {tinyComponents.input("Mot de passe :","","","registerPwd","password","registerPwd","",true,10,InputPwdTitle,dataholder)}
                <Button className='connectionSignInButton'
                onClick={()=>{
                    controlData(data)
                }}>Envoyer</Button>
            </div>
        )
    };


    /**
     * @method fetchToApi : Transmission des données vers l'api * Send data to Api
     * @param fetchRouter : Type de route * router type
     * @param dataToApi : Données à transmettre a l'api * data to send to Api
     */
    const fetchToApi=(fetchRouter,dataToApi)=>{
        if(fetchRouter==="signIn"){
            fetchData("POST", "/api/" + fetchRouter, dataToApi, true).then(
                (dataFromApi) => {
                    localStorage.setItem('_IdMaCaveAVin',dataFromApi.cellar);
                    localStorage.setItem('tokenMaCaveAVin',dataFromApi.token);
                    alert('connexion réussie');
                    setRedirection(true);
                    },
                (error) => {
                  if(error.message===402){
                    alert("La connection a échouée, veuillez contrôler votre email ou votre mot de passe");
                  }
                }
            );
        };
        if(fetchRouter==="register"){
            fetchData("POST", "/api/" + fetchRouter, dataToApi, true).then(
                (dataFromApi) => {
                    alert("Félicitation, vous venez d'ouvrir un compte ! Veuillez vous connecter");
                    //setModalType('alertSuccess');
                    //setToggledModal(true);
                    //resetRegister()
                },
                (error) => {
                  console.error("An error has occured while fetching posts");
                  if(error.message===400){
                    alert("Un compte existe déjà avec cette adresse email");
                    //setModalType('alertAlreadyExist');
                    //setToggledModal(true);
                  };
                  
                }
              );
        };
    };

    const redirect=()=>{    
        if(redirection){
            return(
                <Redirect to="/cellar"/>
            ); 
        };            
        
    };
    
    return (
        <div className="connectionContainer"
        style={{
            backgroundImage:"url(images/cave.jpg)",
        }}>
            {redirect()}
            <div className="connectionTitle">
                <h1>Ma Cave à Vin</h1>
            </div>
            {connectionSignIn(setConnectionData,connectionData)}
            {connectionRegister(setConnectionData,connectionData)}
        </div>
    );
}

export default Connection;