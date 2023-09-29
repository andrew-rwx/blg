import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
async function logintoken(user_data,res){
    try{
        const{username,password}=user_data;
        const user_found=await User.findOne({username: username});
    if(!user_found){
        res.status(401).json({message:"Username o password errati"}); //utente non presente
    }

    const password_match=await bcrypt.compare(password,user_found.password);
    if(!password_match){
        res.status(401).json({message:"Username o password errati"});
    }   
        const TOKEN_STRING=process.env.TOKEN_STRING;
        var token = jwt.sign({ username:user_found.username,
                               email:user_found.email}, TOKEN_STRING,{
                                expiresIn:"8h"
                               });
        return token;
    }
    
    catch(err){
        throw err;
    }
}
export default logintoken;