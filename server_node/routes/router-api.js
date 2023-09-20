import express from "express";
import ricette_helper from "../models/ricette_helper.js";
import registration from "../controllers/registration.js";
import passport from "../config/passport.js";


const router=express.Router();
router.post('/error',async(req,res,next)=>{
    try{
        const {error_response}=req.body;//contiene il body della fetch
        await fetch('/errorpage');
        res.status(200).json(error_response);
    }
    catch(err){
        next(err);
    }
   
                            
})

router.get('/:tiporicetta',async(req,res,next)=>{
    //prendo il valore :id che rappresenta il tipo di ricetta. (Primi,secondi,contorni...)
    const tipo_ricetta=req.params.tiporicetta;
    const modello=ricette_helper[tipo_ricetta];
    
    //ottengo i dati associati tramite query
    try{
        const tipo_ricetta_data=await modello.find({});
        res.json(tipo_ricetta_data);
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
    try{
        await registration(user_data);
        res.status(200).json({result: response});
    }
    catch(error){
        next(error);
    }
});


router.post("/accedi",passport.authenticate('local',{ failureRedirect: '/accedi' }),(req,res)=>{
    res.status(200).json({isConnected:true});

});

export default router;