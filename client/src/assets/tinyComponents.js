/**
 * tinyComponents.js : Contient des mini composants
 */

 import {Button,Form} from 'react-bootstrap'
 import './style.scss';
 import 'bootstrap/dist/css/bootstrap.min.css';

 const tinyComponents={
     /**
      * @method input : Mini composant champ de saisie * Mini component input field
      * @param labelClass : nom de la classe de l'étiquette * Label classname 
      * @param inputClass : nom de la classe du champ de saisie * input field classname 
      * @param label : Libellé de l'étiquette * Label wording
      * @param id  : Libellé de l'id * Id wording
      * @param type  : Type de champ de saisie * input field type
      * @param name  : nom du champ de saisie * input field name
      * @param placeholder  : Saisie réglementée * placeholder
      * @param required  : Champ requis true / false * required field true/false
      * @param onchange  : Action sur changement * Action on change
      */
     input(label,labelClass,inputClass,id,type,name,placeholder,required,maxLength,title,onchange){
         return(
             <div className="tinyInput">
                <label className={labelClass} htmlFor={id}>{label}</label>
                <input
                id={id}
                className={inputClass}
                type={type} 
                name={name} 
                placeholder={placeholder}
                required={required}
                maxLength={maxLength}
                title={title}
                onChange={onchange}                
                ></input>
             </div>
         )
     },
     /**
      * @method checkBox :
      * @param {*} label 
      * @param {*} labelClass 
      * @param {*} inputClass 
      * @param {*} id 
      * @param {*} onchange 
      */
     checkBox(label,labelClass,inputClass,id,onchange){
         return(
             <div className="tinyCheckBox">
                 <label className={labelClass} htmlFor={id}>{label}</label>
                 <input 
                 id={id}
                 className={inputClass}
                 type="checkbox"
                 value='test'
                 onChange={onchange}
                 ></input>                 
             </div>
         )

     },
     /**
      * @method logOut :
      * @param {*} label 
      * @param {*} labelClass 
      * @param {*} id 
      * @param {*} onclick 
      */
     logOut(label,labelClass,id,onclick){
         return(
            <div className="tinyLogOut">
                <label className={labelClass} htmlFor={id}>{label}</label>
                <button 
                id={id}
                onClick={onclick}>
                    Deconnexion</button>
            </div>
         )
     },
     /**
      * @method bottle :
      * @param {*} color 
      * @param {*} text 
      */
     bottle(color,text,size,row,onclick){
         if(row){
            return(
                <div className="tinyBottle"
                onClick={()=>onclick(row._id)}
                style={{
                    backgroundColor:color,
                    width:size,
                    height:size,
                }}>
                    <label>{text}</label>
                </div>
            )
         }else{
            return(
                <div className="tinyBottle"
                style={{
                    backgroundColor:color,
                    width:size,
                    height:size,
                }}>
                    <label>{text}</label>
                </div>
            )  
         }
        
     },
     /**
      * @method listbox :
      * @param {*} name 
      * @param {*} id 
      * @param {*} array 
      * @param {*} size 
      */
     listbox(name,id,array,size){
         function option(array1){
            return array1.map((element,index)=>{
                return <option key={element+index} value={element}>{element}</option>
            });
         };
         return(
            <>
            <select className="tinyListbox" name={name} id={id} size={size}>
                {option(array)}
            </select>
            </>
         );
     },
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