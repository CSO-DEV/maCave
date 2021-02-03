/**
 * Cellar.js : Page de visualisation de la cave
 */
import React,{useEffect}from 'react';
import './style.scss';
import tinyComponents from '../../assets/tinyComponents';
import {Card} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import fetchData from '../../lib/fetch'

function Cellar(props) {

    /**
     * @useEffect
     */
    useEffect(() => {
        getProduct();
      },[]);

    /**
     *@method getProduct :
     */
    const getProduct=()=>{     
          fetchData("POST", "/api/cellar", {}, true).then(
              (result) => {
                console.log(result)
                },
              (error) => {
                console.error("An error has occured while fetching posts");
                alert("Votre connection a expiré, veuillez vous reconnecter")
              }
            ); 
    };




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

    const products = [{"id":"test","name":"Clayette 1 Back","called":"Mercurey","Vintage":2015}];
    const columns = [{
      dataField: 'id',
      text: 'id',
      hidden:true,
    }, {
      dataField: 'name',
      text: products[0].name,
      formatter: (cellContent, row) => {
        return(
            <div className="wineRow">
                <button style={{borderRadius:"100%",width:"25px",height:"25px",backgroundColor:"red"}}></button>
                <div className="wineRowText">                     
                        <span className="wineRowCalled">{row.called}</span>
                        <span className="wineRowVintage">{row.Vintage}</span>                       
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
            <div className="cellarCarousel">
                <div className="cellarCarouselheader">
                    <div>
                        <button> left </button>
                    </div>
                    <span>Cave 1</span>
                    <div>
                        <button> right </button>
                    </div>
                </div>       
                <div className="cellarGlobalDisplay">
                    <div className="cellarDisplay cellar1">
                        <Card className="cellarDisplayShelf" >
                        <Card className="cellarDisplayFrontShelf"><BootstrapTable keyField='id' data={ products } columns={ columns } /></Card>
                            <Card className="cellarDisplayFrontShelf"><BootstrapTable keyField='id' data={ products } columns={ columns } /></Card>
                        </Card>
                        <Card className="cellarDisplayShelf">
                            <Card className="cellarDisplayBackShelf"><BootstrapTable keyField='id' data={ products } columns={ columns } /></Card>
                            <Card className="cellarDisplayBackShelf"><BootstrapTable keyField='id' data={ products } columns={ columns } /></Card>
                        </Card>
                    </div>
                    <div className="cellarDisplay cellar2">
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
            </div>
        </div>
    );
}

export default Cellar;