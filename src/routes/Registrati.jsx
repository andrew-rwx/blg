import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Registrati(){
    const [errorState, setErrorState] = useState();

    const [utente,setUtente]=useState({
        username: '',
        password:'',
        email:''
    })

    const navigate=useNavigate();
    function handleInputChange(event){
        const{name,value}=event.target;
        setUtente({
            ...utente,
            [name]:value

        })
    };

    async function handleSubmit(event){
        event.preventDefault();
        const response=await fetch("/api/registrazione",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(utente)
        });
        try{
            if(!response.ok){
            
                const error_message=await response.json();
                throw new Error(error_message);        
        }
        
        }
        catch(err){
            setErrorState(()=>{
                throw err;
            });
        }

    }
            
    return(
            <form  className="registrazione-form" action="/api/registrazione" method="post" onSubmit={handleSubmit}>
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