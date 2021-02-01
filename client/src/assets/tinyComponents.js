/**
 * tinyComponents.js : Contient des mini composants
 */

 import {Button,} from 'react-bootstrap'
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

     }
     
 }
 export default tinyComponents;