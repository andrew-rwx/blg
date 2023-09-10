import express  from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import module_helper from "./model_dictionary.js";



// Carica le variabili d'ambiente
const app=express()
app.use(express.static("/public"))

const serverport=3000;
async function StartServer(){
    const DB_URI=process.env.DB_URI;
    try{
        await mongoose.connect(DB_URI,{ useNewUrlParser: true,
                                        useUnifiedTopology:true} );
        await app.listen(serverport,()=>(console.log("Server in ascolto")))
        }
    catch(e){
        console.log(e);
    }



    /*routes DATA*/
    app.get('/api/:tiporicetta',async(req,res)=>{
        //prendo il valore :id che rappresenta il tipo di ricetta. (Primi,secondi,contorni...)
        const tipo_ricetta=req.params.tiporicetta;
        const modello=module_helper[tipo_ricetta];
        
        //ottengo i dati associati tramite query
        try{
            const tipo_ricetta_data=await modello.find({});
            res.json(tipo_ricetta_data);
        }
        catch(e){
            console.log(e);
        }

    });

}


StartServer();