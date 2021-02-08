/**
 * modalDetail.js : contenu des modales *
 */
import {Form,Modal,Button} from 'react-bootstrap'
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import tinyComponents from './tinyComponents'

const modalDetail={

    bottleDetail(row,toggledModal,handleClose,handleData){
        const HeaderTitle=  "Cave " + row.cellar.toString() + 
                            " - Clayette "  + row.shelf.toString() + " - " + row.position 
        const buttonType="Annuler/Modifier/Consommer/Supprimer";
        const modalButton=()=>{
            return String(buttonType)
            .split("/")
            .map((element,index)=>{
              return(
                 <Button
                key={"modalButton" + index}
                className="btn-secondary"
                variant="dark"
                onClick={()=>handleClose(index+2)}
                >{element}</Button>              
              )
            })
        };
        const body=()=>{
            return(
                <div>
                    {tinyComponents.input("Cave :",{},{},"cellar","text","cellar","",true,"none","",handleData,row.cellar)}
                    {tinyComponents.input("Clayette :",{},{},"shelf","text","shelf","",true,"none","",handleData,row.shelf)}
                    {tinyComponents.input("Position :",{},{},"position","text","position","",true,"none","",handleData,row.position)}
                    {tinyComponents.input("Couleur :",{},{},"color","text","color","",true,"none","",handleData,row.color)}
                    {tinyComponents.input("Région :",{},{},"region","text","region","",true,"none","",handleData,row.region)}
                    {tinyComponents.input("Appellation :",{},{},"appellation","text","appellation","",true,"none","",handleData,row.appellation)}
                    {tinyComponents.input("Millésime :",{},{},"vintage","text","vintage","",true,"none","",handleData,row.vintage)}
                    {tinyComponents.input("Domaine :",{},{},"winery","text","winery","",true,"none","",handleData,row.winery)}
                    {tinyComponents.input("Appogée mini :",{},{},"miniAppogee","text","miniAppogee","",true,"none","",handleData,row.miniAppogee)}
                    {tinyComponents.input("Appogée maxi :",{},{},"maxiAppogee","text","maxiAppogee","",true,"none","",handleData,row.maxiAppogee)}
                    {tinyComponents.input("Cèpage :",{},{},"grape","text","grape","",true,"none","",handleData,row.grape)}
                    {tinyComponents.input("Prix d'achat :",{},{},"purchasePrice","text","purchasePrice","",true,"none","",handleData,row.purchasePrice)}
                    {tinyComponents.input("Lieu d'achat :",{},{},"purchasePlace","text","purchasePlace","",true,"none","",handleData,row.purchasePlace)}
                    {tinyComponents.input("Prix de vente :",{},{},"sellingPrice","text","sellingPrice","",true,"none","",handleData,row.sellingPrice)}
                    {tinyComponents.input("Notation :",{},{},"score","text","score","",true,"none","",handleData,row.score)}
                    {tinyComponents.input("Commentaire :",{},{},"comment","text","comment","",true,"none","",handleData,row.comment)}
                    {tinyComponents.input("Photo :",{},{},"picture","text","picture","",true,"none","",handleData,row.picture)}
                    {tinyComponents.input("Bouteille :",{},{},"bottleType","text","bottleType","",true,"none","",handleData,row.bottleType)}
                    {tinyComponents.checkBox("Bio ? :",{},{},"organic","organic",handleData,row.organic)}
                </div>
            )
        };
        
        return tinyComponents.modal(
            toggledModal,
            handleClose,
            HeaderTitle,
            modalButton,
            body
            )
    },
    alert(row,toggledModal,handleClose,type){
        let[HeaderTitle,buttonType,textLine1,textLine2]=["","","",""];

        if(type==="supprimer"){
            HeaderTitle="Suppimer" ;
            buttonType="Annuler/Confirmer";
            textLine1="Cette commande prendra en compte la suppression de : ";
            textLine2=row.winery + " " + row.vintage;
        };
        if(type==="consommer"){
            HeaderTitle="Consommer" ;
            buttonType="Annuler/Confirmer";
            textLine1="Cette commande prendra en compte la consommation de : ";
            textLine2=row.winery + " " + row.vintage;
        };       
        const modalButton=()=>{
            return String(buttonType)
            .split("/")
            .map((element,index)=>{
            return(
            <Button
            key={"modalButton" + index}
            className="btn-secondary"
            variant="dark"
            onClick={()=>handleClose(index+2)}
            >{element}</Button>              
            )
            })
            };
        const body=()=>{
        return(
            <div style={{display:'flex',flexDirection:"column"}}>
                <span>{textLine1}</span>
                {textLine2?<span>{textLine2}</span> : <></>}
            </div>
            )
            };

        return tinyComponents.modal(
        toggledModal,
        handleClose,
        HeaderTitle,
        modalButton,
        body
        )
    }    
}
export default modalDetail;