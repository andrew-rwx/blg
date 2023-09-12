import { useState } from "react";
function Registrati(){
    const [utente,setUtente]=useState({
        username: '',
        password:'',
        email:''
    })

    function handleInputChange(event){
        const{name,value}=event.target;
        setUtente({
            ...utente,
            [name]:value

        })
    };
    return(
            <form  className="registrazione-form" action="/api/registrazione" method="post">
                <label  htmlFor="user" >Username:</label>
                <input
                    type="text"
                    name="username"
                    value={utente.username}
                    onChange={handleInputChange}
                />

                <label htmlFor="psw" >Password:</label>
                <input
                    type="text"
                    name="password"
                    value={utente.password}
                    onChange={handleInputChange}
                />
                
                <label htmlFor="mail" >Email:</label>
                <input
                    type="text"
                    name="email"
                    value={utente.email}
                    onChange={handleInputChange}
                />

                <input
                    type="submit"
                    value="Invia"       
                />

            </form>
        
    )
}

export default Registrati;