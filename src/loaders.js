import handleToken from "./utils/handleToken";



function loaderHomePage(){
  const token=localStorage.getItem("token");
  if(token){
    console.log("qui");
    const token_parts=token.split(".") //header-payload-signature
    if(token_parts.length===3){//len valida di un token
      const payload=JSON.parse(atob(token_parts[1]));
      const user_data={
        username:payload.username,
        email:payload.email
      }
      console.log(user_data);
      
      return user_data;//verifico solo se il token è presente,nel componente lo valido quando necessario
    }
  }
    else{
      return false; //nessun token presente
    
  }
}

//------------------------------------------------------//

async function loaderPaginaPersonale(){
  try{
    const token=localStorage.getItem("token");
    if(token){
      const token_response=await handleToken(token); //output:true/false
      if(token_response){
        return token_response; //token presente e valido.
      }
      else{
          const error={status:401,
                       message:"Non autorizzato"};
          throw new Error(error);//server response status 401. Il token non ha superato validazione
      }
      
    }
    else{
      const error={status:401,
                   message:"Non autorizzato"}
      throw new Error(error);//token non presente accesso negato.
    }
  }
  catch(err){
    throw err;//errore proveniente da handleToken
  }
}

//---------------------------------------------------//

async function loaderRecepiesCard({params}){
    const id=params.id;
    try{
      const response=await fetch(`/api/ricette/${id}`);
      if(!response.ok){
        const error_message=await response.json();
        throw new Response(error_message,{status:response.status});
      }
      else{
        const data=await response.json();
        return data;
      }
    }
    catch(err){
      throw new Response(err,{status:err.status});
    }  
}


async function loaderSelectedRecepie({params}){
    try{
      const id_ricetta=params.id_ricetta;
      const response=await fetch('/api/loadcomments',{
        method:'POST',
        body:JSON.stringify(id_ricetta)
      })
      const data=await response.json();
      //todo gestire quando il server manda message:Non ci sono commenti disponibili
      data.id_ricetta=id_ricetta;
      //se esiste un token lo prendo e verifico l'autenticità
      const token=localStorage.getItem("token");
      if(!token){
        return data; //token non presente
    }
    else{
      const token_response=await handleToken(token);
      if(token_response){
        data.token_valid=token_response;
        return data
      }
      else{
        return data
      }
    }     
  }
  catch(err){
    throw err;
  }
}

export{loaderRecepiesCard,loaderSelectedRecepie,loaderHomePage,loaderPaginaPersonale};