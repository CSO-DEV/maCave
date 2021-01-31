/**
 * Cellar.js : Page de visualisation de la cave
 */
import React from 'react';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import tinyComponents from '../../assets/tinyComponents'
import { Card,Button } from 'react-bootstrap';

function Connection(props) {
    /**
     * @var
     */
    const TitleInputPwd="Minimum : 8 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial"

    /**
     * @function dataholder :
     * @param e :
     */
    function dataholder(e){
        console.log(e.target.value)
    };


    return (
        <div className="connectionContainer"
        style={{
            backgroundImage:"url(images/cave.jpg)",
        }}>
            <div className="connectionTitle">
                <h1>Ma Cave à Vin</h1>
            </div>
            <div className="connectionSignIn">
                <h4>Je me connecte...</h4>
                {tinyComponents.input("Email :","","","signInEmail","email","signInEmail","mail@serveur.com",true,"none","",dataholder)}
                {tinyComponents.input("Mot de passe :","","","signInPwd","email","signInEmail","",true,10,TitleInputPwd,dataholder)}
                <Button className='connectionSignInButton'
                onClick={()=>{
                    console.log("envoie");
                }}>Envoyer</Button>
            </div>
        </div>
    );
}

export default Connection;