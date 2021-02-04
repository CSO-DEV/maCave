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
                        console.log(row)
                        return(
                            <div className="wineRow" style={{justifyContent:"center"}}>
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
                              <div style={{minWidth:"30px",minHeight:"30px",backgroundColor:"grey"}}>
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
                return (
                    <div className="cellarDisplay" name={element.cellar} key={'cellar' + index}>
                        {shelf(element.cellarContent,index)}
                    </div>
                )
            })
        };

        function shelf(array,cellar){
            return array.map((element,index)=>{
                let frontData=element.shelfContent[0].front;
                frontData.push({
                                appellation:"Ajouter",
                                cellar:element.shelfContent[0].front[0].cellar,
                                shelf:element.shelfContent[0].front[0].shelf,
                                position:element.shelfContent[0].front[0].position});
                let backData=element.shelfContent[0].back;
                backData.push({
                                appellation:"Ajouter",
                                cellar:element.shelfContent[0].back[0].cellar,
                                shelf:element.shelfContent[0].back[0].shelf,
                                position:element.shelfContent[0].back[0].position});
                let frontTitle=
                "Clayette " + element.shelfContent[0].front[0].shelf +
                " Avant";
                let backtTitle=
                "Clayette " + element.shelfContent[0].back[0].shelf +
                " Arrière";
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