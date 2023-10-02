import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import CustomError from "../utils/CustomError.js";
//la funzione verifica le credenziali di un utente e se corrette genera un token jws.
async function logintoken(user_data,res){
    try{
        const{username,password}=user_data;
        const user_found=await User.findOne({username: username});
        if(!user_found){
            throw new CustomError("Username o password errati",401);
        }
        const password_match=await bcrypt.compare(password,user_found.password);
        if(!password_match){
            throw new CustomError("Username o password errati",401);
        }   

        const TOKEN_KEY=process.env.TOKEN_KEY;
        var token = jwt.sign({ username:user_found.username,
                            email:user_found.email}, TOKEN_KEY,{
                            expiresIn:"8h"
                            });
        return token;
    }
    
    catch(err){
        throw err; //throw dell'errore a livello di route
    }
}
export default logintoken;