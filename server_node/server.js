import express  from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import { config } from "dotenv";


// Carica le variabili d'ambiente
const app=express()
app.use(express.static("/public"))

const serverport=3000;
async function StartServer(){
    const DB_URI=process.env.DB_URI;
    try{
        await mongoose.connect(DB_URI,{ useNewUrlParser: true } );
        await app.listen(serverport,()=>(console.log("Server in ascolto")))
        }
    catch(e){
        console.log(e);
    }
}


StartServer();