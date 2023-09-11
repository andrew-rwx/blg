
import bcrypt from "bcrypt"
import User from "../models/User"

async function registration(user_data){
    const input_username=user_data.username
    const input_password=user_data.password;
    const saltRounds=10;

  
    try{
        const user=new User({
            username:input_username,
            password:hashed_psw,
            comments:{}
        });
        const user_found=await searchUserInDb(user);
        if(user_found){
            throw new Error("Nome utente già utilizzato");
        }
        else{
            const hashed_psw=await bcrypt.hash(input_password,saltRounds);
            await user.save();
        }
    }
    catch(e){
        return e
    }
    return "Registrazione avvenuta con successo!"

}


async function searchUserInDb(user){
    const user_found=await user.find({username: user.input_username});
    return user_found;
}

export default registration;