/**
 * inputControl.js - Contrôle de saisie des mots de passes
 */
const inputControl = {
    /**
     * @method emailControl : Contrôle la saisie de l'email * Email entry control
     * @param {*} email : Email saisi * Email entry
     */
    emailControl(email){
        let pattern = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/i;
            if (pattern.test(email)){               
                    return true
                }else{  
                    return false
                };
            },
    pwdControl(pwd){
        let pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{6,15})$/g;
            if (pattern.test(pwd)){               
                    return true
                }else{  
                    return false
                };
            },
}

export default inputControl;