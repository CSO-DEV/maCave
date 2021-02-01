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
     * @method connection : 
     * @param type : Type d'action "signIn/register" * Action type "signIn / register"
     * @param setData : Enregistrement de données saisie * Data entry recording
     * @param data : Objet de données saisie * Data object entered
     */
    const connection=(type,setData,data)=>{
        const InputPwdTitle="Minimum : 8 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial";
        const InputEmailTitle="";
        /**
        * @function dataholder : Prise en compte des données saisies et contrôle des saisies * Taking into account of data entered and checking entries
        * @param e : Objet de saisie * Input object entry
        */
        function dataholder(e){
            if(e.target.name==="signInEmail" || 
            e.target.name==="signInPwd" || 
            e.target.name==="registerEmail" || 
            e.target.name==="registerPwd" || 
            e.target.name==="lastname" || 
            e.target.name==="firstname"){
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
            let signInEmailControl=inputControl.emailControl(dataControl.signInEmail);
            let signInPwdControl=inputControl.pwdControl(dataControl.signInPwd);
            let registerEmailControl=inputControl.emailControl(dataControl.registerEmail);
            let registerPwdControl=inputControl.pwdControl(dataControl.registerPwd);

            if(type==="signIn"){
                if(!dataControl.signInEmail){
                    alert("Veuillez saisir le champ Email");
                    return;
                };
                if(!dataControl.forgottenPwd){
                    if(!signInEmailControl){
                        alert("Erreur de saisie de l'email " + InputEmailTitle);
                        return;
                    };
                    if(!dataControl.signInPwd){
                        alert("Veuillez saisir le champ mot de passe");
                        return;
                    };
                    if(!signInPwdControl){
                        alert("Erreur de saisie du mot de passe " + InputPwdTitle);
                        return;
                    };
                    fetchToApi(type,dataControl)
                }else{
                    alert("Vous avez oubliez votre mot de passe => lancement modification mot de passe");
                    return;  
                };
            }else{
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
                if(!registerEmailControl){
                    alert("Erreur de saisie de l'email " + InputEmailTitle);
                    return;
                };
                if(!dataControl.registerPwd){
                    alert("Veuillez saisir le champ mot de passe");
                    return;
                };
                if(!registerPwdControl){
                    alert("Erreur de saisie du mot de passe " + InputPwdTitle);
                    return;
                };
                fetchToApi(type,dataControl)
            }           
        };

        return(
            <div>                
                {type==="signIn" ?                
                    <div className="connectionSignIn">                
                        {tinyComponents.input("Email :","","","signInEmail","email","signInEmail","mail@serveur.com",true,"none",InputEmailTitle,dataholder)}
                        {tinyComponents.input("Mot de passe :","","","signInPwd","password","signInPwd","",true,10,InputPwdTitle,dataholder)}
                        {tinyComponents.checkBox("Mot de passe oublié","","","forgotten",dataholder)}
                    </div>
                    :
                    <div className="connectionRegister">                
                        {tinyComponents.input("Nom :","","","lastname","lastname","lastname","",true,"none","",dataholder)}
                        {tinyComponents.input("Prénom :","","","firstname","firstname","firstname","",true,"none","",dataholder)}
                        {tinyComponents.input("Email :","","","registerEmail","email","registerEmail","mail@serveur.com",true,"none",InputEmailTitle,dataholder)}
                        {tinyComponents.input("Mot de passe :","","","registerPwd","password","registerPwd","",true,10,InputPwdTitle,dataholder)}
                </div>
                } 
                <Button className='connectionButton'
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
        fetchData("POST", "/api/" + fetchRouter, dataToApi, true).then(
            (dataFromApi) => {
                localStorage.setItem('_IdMaCaveAVin',dataFromApi.cellar);
                localStorage.setItem('tokenMaCaveAVin',dataFromApi.token);
                if(fetchRouter==="signIn"){
                    alert('connexion réussie')
                }else{
                    alert("Félicitation, vous venez d'ouvrir un compte ! Veuillez vous connecter")
                }
                setRedirection(true);
                },
            (error) => {
              if(error.message===402){
                if(fetchRouter==="signIn"){
                    alert("La connection a échouée, veuillez contrôler votre email ou votre mot de passe");
                }else{
                    alert("Un compte existe déjà avec cette adresse email");
                }
              }
            }
        );
    };
    
    return (
        <div className="connectionContainer"
        style={{
            backgroundImage:"url(images/cave.jpg)",
        }}>
            {redirection ? <Redirect to="/cellar"/> : <></>}
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
                        <Card.Body>{connection("signIn",setConnectionData,connectionData)}</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card className="connectionAccordionCard">
                    <Card.Header className="connectionAccordionHeader">
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        <h4>Je crée un compte...</h4>
                        </Accordion.Toggle>
                    </Card.Header>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>{connection("register",setConnectionData,connectionData)}</Card.Body>
                    </Accordion.Collapse>
                </Card>           
            </Accordion>
        </div>
    );
}

export default Connection;