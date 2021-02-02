/**
 * Cellar.js : Page de visualisation de la cave
 */
import React from 'react';
import './style.scss';
import tinyComponents from '../../assets/tinyComponents';
import { Button,Card,Accordion} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


function Cellar(props) {

    const top=()=>{
        return (
            <div className="cellarTitle">
                <h1>Ma Cave à Vin</h1>
                <div className="cellarDisconnectionButton">
                    {tinyComponents.logOut("nom")}
                </div>
            </div>
        )
    };  

    const products = [{"id":"test","name":"test","price":"price"}];
    const columns = [{
      dataField: 'id',
      text: 'Product ID',
      hidden:true,
    }, {
      dataField: 'name',
      text: 'Product Name',
      formatter: (cellContent, row) => {
        return(
            <div className="wineRow">
                <button style={{borderRadius:"50%",width:"25px",height:"25px",backgroundColor:"red"}}></button>
                <div className="wineRowText">                     
                        <span className="shoppingStyle">{row.price}</span>                      
                </div>                                    
            </div>
            )}
    }, {
      dataField: 'price',
      text: 'Product Price',
      hidden:true,
    }];

    return (
        <div className="cellarContainer"
        style={{backgroundImage:"url(images/cave.jpg)"}}>
            <div className="topContainer">
                {top()}
            </div>
            <div className="cellarDisplay">
                <Card className="cellarDisplayShelf" >
                    <Card className="cellarDisplayFrontShelf"><BootstrapTable keyField='id' data={ products } columns={ columns } /></Card>
                    <Card className="cellarDisplayFrontShelf"><BootstrapTable keyField='id' data={ products } columns={ columns } /></Card>
                </Card>
                <Card className="cellarDisplayShelf">
                    <Card className="cellarDisplayBackShelf"><BootstrapTable keyField='id' data={ products } columns={ columns } /></Card>
                    <Card className="cellarDisplayBackShelf"><BootstrapTable keyField='id' data={ products } columns={ columns } /></Card>
                </Card>
            </div>
        </div>
    );
}

export default Cellar;