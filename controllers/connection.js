/**
 * controller/connection.js : 
 * signIn : contrôle l'email et le mot de passe : revoie l'ID et le token + enregistrement du token * check email and password: review ID and token + token registration
 * signOut : efface le token * remove token
 */

const config=require('../config/keys');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Cellar = require('../models/Cellar');

const connection ={
    signIn:(req,res)=>{
        let token;
        Cellar.findOne({"email" : req.body.signInEmail})
        .then((cellar)=>{        
          if (!cellar){
            return res.status(402).json({message:"email incorrect"});
          }
          bcrypt
          .compare(req.body.signInPwd.toLowerCase(), cellar.pwd)
          .then((valid)=>{
            if (!valid){
              return res
              .status(402)
              .json({message:"mot de passe incorrect"})
            };
            console.log("mot de passe correct");
            token=jwt.sign({cellar:cellar._id}, config.LogKey,{expiresIn:"1h"});          
            res.status(200).json({success:true,cellar:cellar._id,token:token});
            Cellar.updateOne({"email":req.body.signinEmail},{"token":token},(err,data)=>{
              if (err){
                console.log("erreur")
              }else{
                console.log("ok")
              };
            })
          })
          .catch((error)=>res.status(500).json({message1:error}));
        })
        .catch((error)=>res.status(500).json({message2:error}));
      },
    signOut:(req,res)=>{ 
    Cellar.updateOne({"_id":req.body._Id},{"token":""},(err,data)=>{
        if (err){
        console.log("erreur")
        }else{
        console.log("ok")
        };
    })
    },
    register:(req,res)=>{
        const body=req.body;
        bcrypt
        .hash(req.body.registerPwd.toLowerCase(),10)
        .then((hash)=>{
            const cellar = new Cellar({
                firstname:body.firstname,
                lastname :body.lastname,
                email:body.registerEmail,
                pwd:hash,  
            });
            cellar
            .save()
            .then(()=> {
              res.status(200).json({success:true,cellar:cellar._id,token:token});
                console.log("lancer mail de confirmation d'inscription")
              }
            )
            .catch((error)=>res.status(402).json({message: "un compte déjà ouvert sur cette adresse mail"}));
        })
        .catch((error)=>res.status(500).json({message:error}));           
    },   
}
module.exports = connection;