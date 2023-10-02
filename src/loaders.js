import handleToken from "./utils/handleToken";
import getJwtPayload from "./utils/getJwtPayload";



function loaderHomePage(){
  const token=localStorage.getItem("token");
  if(token){
      const payload=getJwtPayload(token);
      if(payload){//output: payload or false se il token formato errato
        const user_data={
          username:payload.username,
          email:payload.email
        }
        return user_data;//il token è presente e nel formato corretto.
      }
      else{
        return false //getJwtPayload ha returnato false quindi formato token errato. Il loader returna false
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
          throw new Error(JSON.stringify(error));//server response status 401. Il token non ha superato validazione
      }
      
    }
    else{
      const error={status:401,
                   message:"Non autorizzato"}
      throw new Error(JSON.stringify(error));//token non presente accesso negato.
    }
  }
  catch(err){
    throw err;//error 500 proveniente da handleToken()
  }
}

//---------------------------------------------------//

async function loaderRecepiesCard({params}){
    const tiporicetta=params.tiporicetta;
    try{
      const response=await fetch(`/api/ricette/${tiporicetta}`);
      if(response.ok){
        const data=await response.json();//array contenente gli oggetti richiesti;
        const ricette=data.ricette;
        return ricette;
      }
      else{
        const error_message=await response.json();
        throw new Response(error_message,{status:response.status});
      }
    }
    catch(err){
      throw new Response(err,{status:err.status});
    }  
}

//-------------------------------------------------//

async function loaderSelectedRecepie({params}){
    try{
      const id_ricetta=params.id_ricetta;
      const response=await fetch('/api/loadcomments',{
        method:'POST',
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({id_ricetta:id_ricetta})
      })
      
      if(response.ok){
        const data=await response.json();//contiene l'array dei commenti, il messaggio commenti non presenti
                                         //o un messaggio di errore dal middleware errorhanlder
          const token=localStorage.getItem("token");
          if(token){
            data.id_ricetta=id_ricetta; //porto il param della ricetta nel loader
            data.foundtoken=true; //specifico che il token è presente per il render condizionale
            return data;
          }
          else{
            data.id_ricetta=id_ricetta; //porto il param della ricetta nel loader
            data.foundtoken=false; //specifico che il token non è presente per il render condizionale
            console.log(data);
            return data; //token non presente invio solo oggetto contentente commenti + param
         }
      }
       
    if(response.status===500){
      const error_message=await response.json();
      throw new Error(JSON.stringify(error_message)); //oggetto restiutio middleware errorhanlder
    }     
  }
  catch(err){
    const generic_error={
      status:"500",
      message:"Ooops,qualcosa è andato storto!"
    }
    if(err.message===generic_error){
      console.log("Errore dal backend");
      throw err; //500 backend
    }
    else{
      console.log(err);//debugging
      throw new Error(JSON.stringify(generic_error)); //500 frontend generico
    }
  }
}

export{loaderRecepiesCard,loaderSelectedRecepie,loaderHomePage,loaderPaginaPersonale};