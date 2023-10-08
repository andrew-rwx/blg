import bcrypt from "bcrypt"
import User from "../models/User.js"
import CustomError from "../utils/CustomError.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';

async function registration(user_data){
const {username,password,email}=user_data;
const saltRounds=10;

    if(password.length<8){
        throw new CustomError("La password deve contenere almeno 8 caratteri",400);
    }
    else{
        const regex_success=/^[a-zA-Z0-9_\-\.]+$/.test(password);
        if(!regex_success){
            throw new CustomError("La password supporta i seguenti caratteri: a-z A-Z 0-9 - _ .",400);
        }
    }


try{
    const user_found=await searchUserInDb(username);


    if(user_found){
        throw new CustomError("Username già utilizzato",400);
    }
    else{
        const hashed_psw=await bcrypt.hash(password,saltRounds);
        const user=new User({
            username:username,
            password:hashed_psw,
            email:email,
            comments:{}})
        await user.save();
        const TOKEN_KEY=process.env.TOKEN_KEY;
        var token = jwt.sign({ username:username,
            email:email}, TOKEN_KEY,{
            expiresIn:"8h"
            });
        return token;
    }
}
catch(err){
    throw err;
}



}


async function searchUserInDb(username){
const user_found=await User.findOne({username:username});
return user_found;
}

export default registration;