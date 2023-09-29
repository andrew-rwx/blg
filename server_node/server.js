import express  from "express";
import 'dotenv/config';
import dbConnect from "./db/dbconnect.js";
import session from "express-session";
import session_obj from "./db/session_obj.js";
import api_router from "./routes/router-api.js";
import error_handler from "./middleware/error_handler.js";
import passport from "./config/passport.js";

const app=express();
app.use(express.static("/public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api',api_router);//router
app.use(error_handler);//error_handling middleware

const PORT=process.env.PORT_BACK;//env port
async function StartServer(next){
    try{
            await dbConnect();
            app.use(session(session_obj));
            app.use(passport.initialize());
            app.use(passport.session());
            app.listen(PORT,()=>(console.log("Server in ascolto")));
        }
    catch(err){
        next(err);
    }
}

StartServer();