import express from "express";
import 'dotenv/config';
import ricette_helper from "../models/ricette_helper.js";
import registration from "../controllers/registration.js";
import RecComment from "../models/RecComments.js";
import jwt from "jsonwebtoken";
import logintoken from "../config/jwt-strategy.js";

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


router.post("/accedi",async(req,res,next)=>{
        try{
            const user_data={
                username:req.body.username,
                password:req.body.password,
            }
            const token=await logintoken(user_data, res)
            res.status(200).json({token:token}); 
        }
        catch(err){
            next(err);
        }
        
    }
);


router.post("/verifytoken",(req,res,next)=>{
    try{
        const tokenHeader=req.headers["Authorization"];
    if(!tokenHeader){
        //token non presente
        res.status(401).json({message:"Accesso negato"})
    }
    if(!tokenHeader.startsWith("Bearer")){
        //formato errato
        res.status(401).json({message:"Accesso negato"});
    }
    //se è presente e rispetta il formato lo verifico
    const token=tokenHeader.substring(7); //tolgo "Bearer+spazio vuoto per ottenere token puro"
    const TOKEN_STRING=process.env.TOKEN_KEY;
    const decoded_token=jwt.verify(token,TOKEN_KEY); //verifica che il token sia stato firmato in precedenza
                                                        //dal server
    res.status(200).json({valid:true});
    }
    catch(err){
        next(err);
    }
    
});


router.put("/writecomment",async(req,res,next)=>{
    try{
        const {req_id,message}=req.body;
        const response=await RecComment.findOneAndUpdate(
            {recepie_id:req_id},
            { $push:{comments:message}},
            {new:true}
        ); //inserisco il commento nella ricetta associata

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
            res.send(200).json({message:"Non ci sono commenti disponibili"});
        }
        else{
            comments_data={
                comments:recepie_comments.comments
            }
            res.send(200).json(comments_data);
        }
       
    }
    catch(err){
        next(err);
    }
    

}) //carica i commenti dal db e invia al frontend;
   

export default router;