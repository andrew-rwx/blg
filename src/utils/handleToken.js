async function handleToken(token){
    try{
        const response=await fetch("/api/verifytoken",{
          method:"POST",
          headers: { "Authorization": `Bearer ${token}`,
                      "Content-Type": "application/json"}
        })
        if(response.ok){
          const token_response=await response.json();
          const valid_token=token_response.valid; //valid:true
          return token_response //token valid
        }
        if(response.status===401){
          const token_invalid_error=await response.json();//errore token non valido.
          console.log(token_invalid_error.message)
          const valid_token=false;
          return valid_token; //token not valid
        }
        if(response.status===500){
          const backend_error=await response.json();
          throw new Error(JSON.stringify(backend_error))//contiene il json di errore del backend
        }
      
    }
    catch(err){
      const generic_error={
        status:"500",
        message:"Ooops,qualcosa è andato storto!"
      }
      if(err.message===generic_error){
        console.log("errore dal backend");
        throw err; //errore 500 dal backend err.message corrisponde al res.json del middleware di errore
      }
      else{
        throw new Error(JSON.stringify(generic_error));//errore 500 dal frontend
      }
    }
      
}
export default handleToken;