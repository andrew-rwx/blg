import express  from "express";
import 'dotenv/config';
import dbConnect from "./db/dbconnect.js";
import session from "express-session";
import session_obj from "./db/session_obj.js";
import api_router from "./routes/router-api.js";
import error_handler from "./middleware/error_handler.js";

const app=express();
app.use(express.static("/public"));
app.use(express.urlencoded({extended:true}));
app.use('/api',api_router);//router
app.use(error_handler);

const server_port=process.env.server_port;//env port
async function StartServer(){
    try{
            await dbConnect();
            app.use(session(session_obj));
            app.listen(server_port,()=>(console.log("Server in ascolto")));
        }
    catch(e){
        console.log(e);
    }
}

StartServer();