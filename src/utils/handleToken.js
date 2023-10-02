async function handleToken(token){
    try{
        const response=await fetch("/api/verifytoken",{
          method:"POST",
          headers: { "Authorization": `Bearer ${token}`,
                      "Content-Type": "application/json"}
        })
        const data=await response.json(); //token_data o json response error from error handlerr
        if(response.ok){
          const token_response=data.valid; //valid:true
          return token_response //token valid
        }
        if(response.status===401){
          const token_response=data.valid; //valid:false
          return token_response; //token not valid
        }
        if(response.status===500){
          throw new Error(JSON.stringify(data))//contiene il json di errore del backend
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