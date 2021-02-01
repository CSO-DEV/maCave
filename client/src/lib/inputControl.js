/**
 * inputControl.js - Contrôle de saisie des mots de passes
 */
const inputControl = {
    /**
     * @method emailControl : Contrôle la saisie de l'email * Email entry control
     * @param email : Email saisi * Email entry
     */
    emailControl(email){
        let pattern = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/i;
            if (pattern.test(email)){               
                    return true
                }else{  
                    return false
                };
    },
    /**
     * @method pwdControl : Contrôle la saisie du mot de passe * Password entry control
     * @param pwd : mot de passe saisi * Password entry
     */
    pwdControl(pwd){
        let pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{5,15})$/g;
            if (pattern.test(pwd)){               
                    return true
                }else{  
                    return false
                };
    },
    /**
     * @method dataholder : Enregistrement des données dans un objet * Saving data to an object
     * @param e : Objet de saisie * Input object entry
     * @param object : Objet d'enregistrement des données saisies *  Data entered recording object
     */
    dataholder(e,object,check){
        let data={...object,[e.target.name]:e.target.value};
        return data;
    },


}

export default inputControl;