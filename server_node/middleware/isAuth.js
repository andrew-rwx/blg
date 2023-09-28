import passport from "passport";

//middleware che gestisce i casi in cui un utente cerca di raggiungere una route protetta direttamente
//dalla barra di ricerca.
function isAuth(req,res,next){
    if( req.isAuthenticated()){
        next();
    }
    else{
        res.status(401).json({message:"Permesso negato"});
    }
}
export default isAuth;