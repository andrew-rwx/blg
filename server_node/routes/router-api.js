import express from "express";
import ricette_helper from "../models/ricette_helper.js";
import registration from "../controllers/registration.js";

const router=express.Router();

router.get('/:tiporicetta',async(req,res)=>{
    //prendo il valore :id che rappresenta il tipo di ricetta. (Primi,secondi,contorni...)
    const tipo_ricetta=req.params.tiporicetta;
    const modello=ricette_helper[tipo_ricetta];
    
    //ottengo i dati associati tramite query
    try{
        const tipo_ricetta_data=await modello.find({});
        res.json(tipo_ricetta_data);
    }
    catch(e){
        res.json(e);
    }

});


router.post("/registrazione",async(req,res)=>{
    const user_data={
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    }
    const response=await registration(user_data);
    res.status(200).json({result: response});
});

export default router;