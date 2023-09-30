async function handleToken(token){
    try{
        if(token){
            const response=await fetch("/api/verifytoken",{
              method:"POST",
              headers: {'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'}
            })
            const data=await response.json(); //token_data o error from error hanlder
            if(response.ok){
              const token_response=data.valid; //valid:true
              return token_response
            }
            if(response.status===401){
              const token_response=data.valid; //valid:false
              return token_response; 
            }

            if(response.status===500){
             
            }
      }
    }
    catch(err){
      const error={
        status:"500",
        message:"Ooops,qualcosa è andato storto!"
      }
      throw new Error(JSON.stringify(error)); //errore nel backend throwo il messaggio di errore del backend contenuto in data
    }
      
}
export default handleToken;