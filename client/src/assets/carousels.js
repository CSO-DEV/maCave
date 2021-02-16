/**
 * caroussels.js : Contient les caroussels
 */

import {Button,Card} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import {FaWineBottle} from 'react-icons/fa';
import {FaLeaf} from 'react-icons/fa';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import tinyComponents from './tinyComponents';


const caroussels={

    /**
     * @method cellar : Affichage des caves * cellar display
     * @param cellarList : Liste des caves * cellar list
     * @param products : Liste des produits * products list
     * @param onclick  : Commande sur selection d'une bouteille * 
     * @param cellarChoise : Choix de la cave à afficher *
     */
    cellar(cellarList,products,handleRowData,cellarChoise,modalControl,activeCellar,cellarNameList){  
        /**
         * @function column : Configuration des colonnes * column configuration
         * @param title : Titre des tableaux * tables title
         */
        function column(title){
            const column = [{
                dataField: 'id',
                text: 'id',
                hidden:true,
              }, {
                dataField: 'name',
                text: title,
                formatter: (cellContent, row) => {
                    if(row.appellation==="Ajouter"){             
                        return(
                            <div className="wineRow wineRowButton">
                                <Button variant="secondary" size="sm" onClick={()=>{
                                    handleRowData(row);
                                    modalControl(true,"addProduct")                             
                                }}>+<FaWineBottle/></Button>                     
                            </div>
                            )
                    }else{
                      return(
                          <div className="wineRow">
                              <div className="wineRowBottle">
                                {tinyComponents.bottle(row.color,"","20px",row,handleRowData,modalControl)}
                              </div>
                              
                              <div className="wineRowText">                     
                                      <span className="wineRowCalled">{row.winery}</span>
                                      {row.organic?
                                      <div>
                                        <FaLeaf className="organicIcon"/>
                                        <span className="wineRowVintage">{row.vintage}</span>
                                      </div>
                                    :
                                        <span className="wineRowVintage">{row.vintage}</span>
                                    }                      
                              </div>                                    
                          </div>
                          )}
                    }
                  
              }];
            return column;
        };

        function cellar(array){
            return array.map((element,index)=>{
                return (
                    <div className="cellarDisplay" id={element.cellar} name={element.cellarName} key={'cellar' + index}>
                        {shelf(element.cellarContent,element.cellar)}
                    </div>
                )
            })
        };

        function shelf(array,cellar){
            return array.map((element,index)=>{
                let [frontData,backData,frontTitle,backtTitle]=[[],[],"",""];
                if(element.shelfContent[0].avant){
                    element.shelfContent[0].avant.forEach(list => {
                        frontData.push(list); 
                    });                    
                    frontData.push({
                                    appellation:"Ajouter",
                                    cellar:cellar,
                                    shelf:element.shelf,
                                    position:"Avant"
                                });                               
                    
                }else{
                    frontData.push({
                        appellation:"Ajouter",
                        cellar:cellar,
                        shelf:element.shelf,
                        position:"Avant"
                    })
                };
                if(element.shelfContent[1].arriere){
                    element.shelfContent[1].arriere.forEach(list => {
                        backData.push(list); 
                    }); 
                    backData.push({
                                    appellation:"Ajouter",
                                    cellar:cellar,
                                    shelf:element.shelf,
                                    position:"Arrière"
                                });                    
                }else{
                    backData.push({
                        appellation:"Ajouter",
                        cellar:cellar,
                        shelf:element.shelf,
                        position:"Arrière"
                    })
                };
                frontTitle="Clayette " + element.shelf + " Avant";
                backtTitle="Clayette " + element.shelf + " Arrière";               
                
                return (
                    <Card className="cellarDisplayShelf" key={cellar + 'shelf' + index} >
                        <Card className="cellarDisplayFrontShelf"><BootstrapTable keyField='id' data={ frontData } columns={ column(frontTitle) } /></Card>
                        <Card className="cellarDisplayBackShelf"><BootstrapTable keyField='id' data={ backData } columns={ column(backtTitle) } /></Card>
                    </Card>
                )
            })
        };
        
        return(
            <>
            <div className="cellarCarouselheader">
                {tinyComponents.filter("","",cellarNameList,cellarChoise,"Cave ","","")}
     
                
            </div> 
            <div className="cellarGlobalDisplay" id="cellarGlobalDisplay">
                <div className="cellarDisplayContainer" style={{display: "flex"}}>
                    {cellar(products)}
                </div>
                          
            </div> 
        </>
        )
    }
    
}
export default caroussels;