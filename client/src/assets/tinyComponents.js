/**
 * tinyComponents.js : Contient des mini composants
 */

 import {Form,Modal,Button} from 'react-bootstrap'
 import {AiOutlinePoweroff} from "react-icons/ai";
 import {FaLeaf} from 'react-icons/fa';
 import './style.scss';
 import 'bootstrap/dist/css/bootstrap.min.css';


 const tinyComponents={
     modal(
        toggledModal,
        handleClose,
        HeaderTitle,
        modalButton,
        body){
    
        return (
            <div className="modal">     
              <Modal show={toggledModal} onHide={()=>handleClose(1) }>
                <Modal.Header closeButton>
                  <Modal.Title>{HeaderTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{maxHeight:"60vh",overflow:"hidden",overflowY:"auto"}}>{body()}</Modal.Body>
                <Modal.Footer>
                    {modalButton()}
                </Modal.Footer>
              </Modal>
            </div>
          );
     },
     /**
      * @method input : Mini composant champ de saisie * Mini component input field
      * @param labelClass : nom de la classe de l'étiquette * Label classname 
      * @param inputWidth : largeur du champ de saisie * input field width 
      * @param label : Libellé de l'étiquette * Label wording
      * @param id  : Libellé de l'id * Id wording
      * @param type  : Type de champ de saisie * input field type
      * @param name  : nom du champ de saisie * input field name
      * @param placeholder  : Saisie réglementée * placeholder
      * @param required  : Champ requis true / false * required field true/false
      * @param onchange  : Action sur changement * Action on change
      */
     input(label,styleLabel,styleInput,id,type,name,placeholder,required,maxLength,title,onchange,value){
         return(
             <div className="tinyInput">
                <label 
                style={styleLabel}
                 htmlFor={id}>{label}</label>
                <input
                id={id}
                type={type} 
                name={name} 
                style={styleInput}
                placeholder={placeholder}
                required={required}
                maxLength={maxLength}
                title={title}
                onChange={(e)=>onchange(e)}
                value={value}               
                ></input>
             </div>
         )
     },
     /**
      * @method checkBox :
      * @param label 
      * @param labelClass 
      * @param inputClass 
      * @param id 
      * @param onchange 
      */
     checkBox(label,styleLabel,styleInput,id,name,onchange,value){
         return(
             value?
             <div className="tinyCheckBox">
                 <label style={styleLabel} htmlFor={id}>{label}</label>
                 <input 
                 id={id}
                 style={styleInput}
                 name={name}
                 type="checkbox"
                 checked='checked'
                 value={value}
                 onChange={onchange}
                 ></input>                 
             </div>
             :
             <div className="tinyCheckBox">
             <label style={styleLabel} htmlFor={id}>{label}</label>
             <input 
             id={id}
             style={styleInput}
             name={name}
             type="checkbox"
             value={value}
             onChange={onchange}
             ></input>                 
         </div>
         )

     },
     /**
      * @method logOut :
      * @param label 
      * @param labelClass 
      * @param id 
      * @param onclick 
      */
     logOut(label,onclick,labelClass,id){
         return(
            <div className="tinyLogOut">
                <label className={labelClass} htmlFor={id}>{label}</label>
                <button 
                id={id}
                onClick={onclick}>
                    <AiOutlinePoweroff/></button>
            </div>
         )
     },
     /**
      * 
      * @param {*} color 
      * @param {*} text 
      * @param {*} size 
      * @param {*} row 
      * @param {*} bottleSelect 
      * @param {*} setToggledModal 
      */
     bottle(color,text,size,row,handleRowData,modalControl){
        let wineColor;
        if(color==="rouge"){
            wineColor="#800000"
        }else if (color==="rose"){
            wineColor="#F8CBAD"
        }else if (color==="blanc"){
            wineColor="#FFF2CC"
        }else{
            wineColor="#E7E6E6"
        }
         if(row){
            return(
                    <button 
                    onClick={()=>{
                        handleRowData(row);
                        modalControl(true,"modify");
                    }}
                    style={{
                        backgroundColor:wineColor,
                    }}
                />
            )
         }else{
            return(
                <div className="tinyBottle"
                style={{
                    backgroundColor:wineColor,
                    width:size,
                    height:size,
                }}>
                    <label style={{color:"black"}}>{text}</label>
                </div>
            )  
         }
        
     },

     organic(color,text,style){
        return(
            <div className="tinyOrganicIcon"
            style={style}>
                <label style={{color:"black"}}>{text}</label>
                <FaLeaf style={style}/>                
            </div>
        )  
     },
     /**
      * @method listbox :
      * @param name 
      * @param id 
      * @param array 
      * @param size 
      */
     listbox(name,id,array,size,onChange){
         function option(array1){
            return array1.map((element,index)=>{
                return <option key={element+index} value={element}>{element}</option>
            });
         };
         return(
            <>
            <select className="tinyListbox" name={name} id={id} size={size} onChange={onChange}>
                {option(array)}
            </select>
            </>
         );
     },
     /**
      * 
      * @param list 
      * @param cellarChoise 
      * @param text 
      */
     filter(list,cellarChoise,text){
        function optionList(){
            return list.map((element,index)=>{
                return (
                    <option 
                    key={"option" + index}
                    value={element}>{text+element}</option>
                );
            });
        };
        return(
            <Form.Control
            as="select"
            className="my-1 mr-sm-2 categoryFilter"
            id="inlineFormCustomSelectPref"
            name="filter"
            //defaultValue={categoryChoise}
            custom
            onChange={(e)=>cellarChoise(e)}
        >
            {/*<option value="all">Toutes Catégories...</option>*/}
            {optionList()}
        </Form.Control>   
        );
    },
     
 }
 export default tinyComponents;