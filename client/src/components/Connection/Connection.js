/**
 * Cellar.js : Page de visualisation de la cave
 */
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button,Card,Accordion} from 'react-bootstrap';
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
            console.log(e.target.type);
            if(e.target.name==="signInEmail" || e.target.name==="signInPwd"){
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
            if(e.target.name==="registerEmail" || e.target.name==="registerPwd" || e.target.name==="lastname" || e.target.name==="firstname"){
                setData(inputControl.dataholder(e,data));
            };
        };

        /**
         * @function controlData : Contrôle des données saisies
         * @param dataControl : Données saisies
         */
        function controlData(dataControl){
            console.log(dataControl);
            let emailControl=inputControl.emailControl(dataControl.registerEmail);
            let pwdControl=inputControl.pwdControl(dataControl.registerPwd);
            if(!dataControl.lastname){
                alert("Veuillez saisir votre nom");
                return;
            };
            if(!dataControl.firstname){
                alert("Veuillez saisir votre prénom");
                return;
            };
            if(!dataControl.registerEmail){
                alert("Veuillez saisir votre email2");
                return;
            };
            if(!emailControl){
                alert("Erreur de saisie de l'email " + InputEmailTitle);
                return;
            };
            if(!dataControl.registerPwd){
                alert("Veuillez saisir le champ mot de passe");
                return;
            };
            if(!pwdControl){
                alert("Erreur de saisie du mot de passe " + InputPwdTitle);
                return;
            };
            fetchToApi(type,dataControl)
        };

        return(
            <div className="connectionRegister">                
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
                    setRedirection(true);
                },
                (error) => {
                  console.error("An error has occured while fetching posts");
                  if(error.message===400){
                    alert("Un compte existe déjà avec cette adresse email");
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
    
    console.log(connectionData);
    return (
        <div className="connectionContainer"
        style={{
            backgroundImage:"url(images/cave.jpg)",
        }}>
            {redirect()}
            <div className="connectionTitle">
                <h1>Ma Cave à Vin</h1>
            </div>
            <Accordion className="connectionAccordion" defaultActiveKey="0">
                <Card className="connectionAccordionCard">
                    <Card.Header className="connectionAccordionHeader">
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <h4>Je me connecte...</h4>
                        </Accordion.Toggle>
                    </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>{connectionSignIn(setConnectionData,connectionData)}</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card className="connectionAccordionCard">
                    <Card.Header className="connectionAccordionHeader">
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        <h4>Je crée un compte...</h4>
                        </Accordion.Toggle>
                    </Card.Header>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>{connectionRegister(setConnectionData,connectionData)}</Card.Body>
                    </Accordion.Collapse>
                </Card>           
            </Accordion>
        </div>
    );
}

export default Connection;