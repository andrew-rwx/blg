import Cookies from "js-cookie";


function loaderHomePage(){
  const token=localStorage.getItem("token");
  if(token){
    const token_parts=token.split(".") //header-payload-signature
    if(token_parts.length===3){//len valida di un token
      const payload=JSON.parse(atob(token_parts[1]));
      return payload;
    }
    else{
      throw new Error;
    }
  }
}

async function loaderPaginaPersonale(){
  const token=localStorage.getItem("token");
  if(token){
    const response=await fetch("/api/paginapersonale",{
      method:"POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }); //chiedo la valutazione del token nell header
  }
  else{
    throw new Response("Non autorizzato",400);
  }
  
}
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
      const sid=Cookies.get('session') || '';
      if(sid){
        data.connected=true;
      }
      return data; //commenti + var connected=true/false
      }
      catch(err){
        throw new Response(err,{status:err.status});
      }
    }


export{loaderRecepiesCard,loaderSelectedRecepie,loaderHomePage};