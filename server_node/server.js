import express  from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import{Colazione,Primi,Secondi,Contorni,Dolci,Spuntini} from "./tipi_ricettaSchema.js"



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



    /*routes*/
    app.get('/api/:tiporicetta',async(req,res)=>{
        //prendo il valore :id che rappresenta il tipo di ricetta. (Primi,secondi,contorni...)
        const tipo_ricetta=req.params.tiporicetta;
        //scelgo il modello in base al param
        let modello;
        switch(tipo_ricetta){
            case "colazione": 
                modello=Colazione;
                break;
            case "primipiatti":
                modello=Primi;
                break;
            case "secondipiatti":
                modello=Secondi;
                break;
            case "contorni":
                modello=Contorni;
                break;
            
            case "dolci":
                modello=Dolci;
                break;

            case "spuntini":
                modello=Spuntini;
                break;
            
            default:
                res.status(404).json({error:"modello non presente"});
                return;
                
        }
        //ottengo i dati associati tramite query
        try{
            const tipo_ricetta_data=await modello.find({});
            res.json(tipo_ricetta_data);
        }
        catch(e){
            console.log(e);
        }

    });


    app.get("/api/:tiporicetta/:id_ricetta",async (req,res)=>{
        const tipo_ricetta=req.params.tiporicetta;
        const id_ricetta=req.params.id_ricetta;
        let modello;
        switch(tipo_ricetta){
            case "colazione": 
                modello=Colazione;
                break;
            case "primipiatti":
                modello=Primi;
                break;
            case "secondipiatti":
                modello=Secondi;
                break;
            case "contorni":
                modello=Contorni;
                break;
            
            case "dolci":
                modello=Dolci;
                break;

            case "spuntini":
                modello=Spuntini;
                break;
            
            default:
                res.status(404).json({error:"modello non presente"});
                return;
                
        }

        try{
            const data=await modello.findOne({_id:id_ricetta});
            res.json(data);
        }
        catch(e){
            console.log(e);
        }

        
    });
}


StartServer();