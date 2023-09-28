function regen(){
    //faccio una copia del contenuto di req.session.passport senza puntare
    //alla sua stessa cella di memoria
    const session_data={...req.session.passport};
    console.log(session_data); //debugging                                                
    req.session.regenerate(function(err){
        if(err){
            next(err);
            return;
        }
        else{
            req.session.passport=session_data;
            req.session.save(function(err){
                if(err){
                    next(err);
                    return;
                }
                //debugging:
                console.log(req.session.passport);
            })
        }
    })
}
export default regen;