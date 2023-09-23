import bcrypt from "bcrypt"
import User from "../models/User.js"
import CustomError from "../utils/CustomError.js";

async function registration(user_data){
const {username,password,email}=user_data;
const saltRounds=10;
throw new Error("Error");
    if(password.length<8){
        throw new CustomError("La password deve contenere almeno 8 caratteri",400);
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