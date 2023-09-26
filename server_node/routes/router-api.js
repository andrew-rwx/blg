import express from "express";
import 'dotenv/config';
import ricette_helper from "../models/ricette_helper.js";
import registration from "../controllers/registration.js";
import passport from "../config/passport.js";
import RecComment from "../models/RecepiesComments.js";

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

router.post("/writecomment",async(req,res)=>{
    try{
        const {req_id,message}=req.body;

    }
    catch(err){
        next(err);
    }
})

router.post("/loadcomments",async(req,res)=>{
    try{
        const rec_id=req.body;
        const comments=await RecComment.findOne({recepie_id:rec_id});
        res.send(200).json(comments);
    }
    catch(err){
        next(err);
    }
    

}) //carica i commenti dal db e invia al frontend;
   

export default router;