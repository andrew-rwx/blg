function getJwtPayload(token){
    const token_parts=token.split(".") //header-payload-signature
    if(token_parts.length===3){//len valida di un token
      const payload=JSON.parse(atob(token_parts[1]));
      return payload
    }
    else{
        return false //token non nel formato corretto
    }
}
export default getJwtPayload;