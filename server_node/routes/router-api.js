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
    const {tiporicetta}=req.params;
    const modello=ricette_helper[tiporicetta];
    
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
        const tokenHeader=req.header("Authorization");
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
    const TOKEN_KEY=process.env.TOKEN_KEY;
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
        const {data_comment}=req.body;
        console.log(data_comment);
        //gestire casistiche ricetta nuova mai inizializzata oppure gia presente in DB
        //caso  ricetta già presente:
        const recepie_comments=await RecComment.findOneAndUpdate(
            {id_ricetta:data_comment.id_ricetta},
            { $push:{comments:data_comment.comment_info} },
            {new:true}
        ); //inserisco il commento nella ricetta associata
        //ricetta mai inizializzata
        if(!recepie_comments){
            const commenti_ricetta=new RecComment({
                id_ricetta:data_comment.id_ricetta,
                comments:data_comment.comment_info
            });
            await commenti_ricetta.save();
            
        }

        res.sendStatus(200);

    }
    catch(err){
        next(err);
    }
})

router.post("/loadcomments",async(req,res,next)=>{
    try{ 
        const {id_ricetta}=req.body;// mi serve per trovare il documento corretto nella collection
        const recepie_comments=await RecComment.findOne({id_ricetta:id_ricetta});
        if(!recepie_comments){ //ricetta mai inizializzata quindi commenti non presenti
            res.status(200).json({comments:"Non ci sono commenti disponibili"});
        }
        else{
            const comments_data=recepie_comments.comments; //prendo solo il campo comments che mi interessa
            res.status(200).json({comments:comments_data});
        }
       
    }
    catch(err){
        next(err);
    }
    

}) //carica i commenti dal db e invia al frontend;
   

export default router;