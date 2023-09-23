import express from "express";
import 'dotenv/config';
import ricette_helper from "../models/ricette_helper.js";
import registration from "../controllers/registration.js";
import passport from "../config/passport.js";

const PORT=process.env.PORT_FRONT;
const router=express.Router();


router.get('/:tiporicetta',async(req,res,next)=>{
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
    console.log("hi")
    const user_data={
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    }
    try{
        await registration(user_data);
        res.status(200).redirect('/');
    }
    catch(error){
        next(error);
    }
});


router.post("/accedi",passport.authenticate('local',{ failureRedirect: '/accedi' }),(req,res)=>{
    res.status(200).json({isConnected:true});

});

export default router;