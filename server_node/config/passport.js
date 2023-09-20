import passport from "passport";
import { Strategy } from "passport";
import User from "../models/User.js";
import bcrypt from "bcrypt";
passport.use('local',new Strategy(async function verify(username,password,done){
    try{
        const user_found=await User.findOne({username: username});
        if(!user_found){
            return done(null,false,{message:"Utente non presente"}); //utente non presente
        }
    
        const password_match=await bcrypt.compare(password,user.password);
        if(!password_match){
            return done(null,false,{message:"Password errata"});
        }

        return done(null,user_found);
    }
    catch(err){
        return done(err);
    }
   
}   
))

passport.serializeUser(function(user_found,done){
    done(null,user_found._id);
})
//specifica cosa aggiungere nell'oggetto Session standard che express-session creerà

passport.deserializeUser(async function(user_found,done){
    done(null,user_found);
}) //inserisce nel req.user i dati dello user legato alla sessione per evitare troppe query al db. Velocità
export default passport;