/**
 * caroussels.js : Contient les caroussels
 */

import {Button,Card} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import tinyComponents from './tinyComponents';


const caroussels={

    cellar(cellarList,products,onclick,cellarChoise){        
        
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
                            <div className="wineRow">
                                <Button variant="secondary" size="sm" onClick={()=>alert("Nouvelle bouteille dans cave " + row.cellar + " Clayette " + row.shelf + " " +  row.position)}>Ajouter une bouteille</Button>                     
                            </div>
                            )
                    }else{
                        let color;
                        if(row.color==="rouge"){
                            color="#800000"
                        }else if (row.color==="rose"){
                            color="#F8CBAD"
                        }else if (row.color==="blanc"){
                            color="#FFF2CC"
                        }else{
                            color="#E7E6E6"
                        }
                      return(
                          <div className="wineRow">
                              <div className="wineRowBottle">
                                {tinyComponents.bottle(color,"","20px",row,onclick)}
                              </div>
                              
                              <div className="wineRowText">                     
                                      <span className="wineRowCalled">{row.appellation}</span>
                                      <span className="wineRowVintage">{row.vintage}</span>                       
                              </div>                                    
                          </div>
                          )}
                    }
                  
              }];
            return column;
        };

        function cellar(array){
            return array.map((element,index)=>{
                console.log(element)
                return (
                    <div className="cellarDisplay" name={element.cellar} key={'cellar' + index}>
                        {shelf(element.cellarContent,element.cellar)}
                    </div>
                )
            })
        };

        function shelf(array,cellar){
            return array.map((element,index)=>{
                let [frontData,backData,frontTitle,backtTitle]=[[],[],"",""];
                if(element.shelfContent[0].front){
                    element.shelfContent[0].front.forEach(list => {
                        frontData.push(list); 
                    });                    
                    frontData.push({
                                    appellation:"Ajouter",
                                    cellar:cellar,
                                    shelf:element.shelf,
                                    position:"front"
                                });                               
                    
                }else{
                    frontData.push({
                        appellation:"Ajouter",
                        cellar:cellar,
                        shelf:element.shelf,
                        position:"front"
                    })
                };
                if(element.shelfContent[1].back){
                    element.shelfContent[1].back.forEach(list => {
                        backData.push(list); 
                    }); 
                    backData.push({
                                    appellation:"Ajouter",
                                    cellar:cellar,
                                    shelf:element.shelf,
                                    position:"back"
                                });                    
                }else{
                    backData.push({
                        appellation:"Ajouter",
                        cellar:cellar,
                        shelf:element.shelf,
                        position:"back"
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
                {tinyComponents.filter(cellarList,cellarChoise)}       
            </div> 
            <div className="cellarGlobalDisplay" id="cellarGlobalDisplay">
                <div style={{display: "flex"}}>
                    {cellar(products)}
                </div>            
            </div> 
        </>
        )
    }
    
}
export default caroussels;