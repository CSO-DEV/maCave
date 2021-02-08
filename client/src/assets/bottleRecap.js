/**
 * bottleRecap.js : Affiche le recapitulatif par bouteille *
 */

import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import tinyComponents from './tinyComponents'

const recap={
    /**
     * @function bottleRecap
     * @param productList 
     * @param size 
     */
    bottleRecap(productList,size){
        let [nbRouge,nbRose,nbBlanc,nbChampagne]=[0,0,0,0];
        productList.forEach(element=>{
            if(element.color==="rouge" && !element.consumptionDate && !element.deletionDate){nbRouge+=1}
            if(element.color==="rose" && !element.consumptionDate && !element.deletionDate){nbRose+=1}
            if(element.color==="blanc" && !element.consumptionDate && !element.deletionDate){nbBlanc+=1};
            if(element.color!=="rouge" && element.color!=="rose" && element.color!=="blanc" && !element.consumptionDate && !element.deletionDate){nbChampagne+=1}
          });
          return(
              <div style={{display:"flex", flexDirection:"row"}}>
                {tinyComponents.bottle("rouge",nbRouge,size)}
                {tinyComponents.bottle("rose",nbRose,size)}
                {tinyComponents.bottle("blanc",nbBlanc,size)}
                {tinyComponents.bottle("champagne",nbChampagne,size)}
              </div>      
              )
    }    
}
export default recap;