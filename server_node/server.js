import express  from "express";
import "dotenv/config";
import dbConnect from "./db/dbconnect.js";
import api_router from "./routes/router-api.js";
import error_handler from "./middleware/error_handler.js";



const app=express();
app.use(express.static("/public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());//parsing automatico body in formato json dal frontend
app.use('/api',api_router);//router
app.use(error_handler);//error_handling middleware

const PORT=process.env.PORT_BACK;//env port
async function StartServer(){
    try{
            await dbConnect();
            app.listen(PORT,()=>(console.log("Server in ascolto")));
        }
    catch(err){
        console.log(err);
    }
}

StartServer();