import express from "express";
import 'dotenv/config';
import ricette_helper from "../models/ricette_helper.js";
import registration from "../controllers/registration.js";
import passport from "../config/passport.js";
import RecComment from "../models/RecComments.js";
import { connect } from "mongoose";

const PORT=process.env.PORT_FRONT;
const router=express.Router();


router.get('/ricette/:tiporicetta',async(req,res,next)=>{
    //prendo il valore :id che rappresenta il tipo di ricetta. (Primi,secondi,contorni...)
    const tipo_ricetta=req.params.tiporicetta;
    const modello=ricette_helper[tipo_ricetta];
    
    //ottengo i dati associati tramite query
    try{
        const tipo_ricetta_data=await modello.find({});
        res.status(200).json(tipo_ricetta_data);
    }
    catch(err){
        next(err); //passo l'errore al middleware handler
    }

});


router.post("/registrazione",async(req,res,next)=>{
    const user_data={
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    }
    console.log("Qui")
    try{
        await registration(user_data);
        res.status(200).redirect('/');
    }
    catch(error){
        console.log(error);
        next(error);
    }
});


router.post("/accedi",passport.authenticate('local'),(req,res)=>{
        res.status(200).redirect('/');
    }
);

router.put("/writecomment",async(req,res,next)=>{
    try{
        const {req_id,message}=req.body;
        const response=await RecComment.findOneAndUpdate(
            {recepie_id:req_id},
            { $push:{comments:message}},
            {new:true}
        );

        res.status(200);

    }
    catch(err){
        next(err);
    }
})

router.post("/loadcomments",async(req,res,next)=>{
    try{ 
        let connected=false;    
        if(req.session){
            connected=true;
        } //dirà a react se caricare con render condizionale l'opzione Accedi/Registrati connected=false o Scrivi un commento connected=true;
        const recepie_id=req.body.id_ricetta;
        const recepie_comments=await RecComment.findOne({recepie_id:recepie_id});
        if(recepie_comments==[]){
            res.send(200).json("Non ci sono commenti disponibili");
        }
        else{
            comments_data={
                comments:recepie_comments.comments,
                connected: connected
            }
            res.send(200).json(comments_data);
        }
       
    }
    catch(err){
        next(err);
    }
    

}) //carica i commenti dal db e invia al frontend;
   

export default router;