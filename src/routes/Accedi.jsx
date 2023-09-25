import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Accedi(){
    const [errorState, setErrorState] = useState();

    const [utente,setUtente]=useState({
        username: '',
        password:''
    });

    const navigate=useNavigate();
    function handleInputChange(event){
        const{name,value}=event.target;
        setUtente({
            ...utente,
            [name]:value

        })
    };

    async function handleSubmit(event){
        try{
        
            event.preventDefault();
            const response=await fetch("/api/accedi",{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(utente)
            });
            console.log(response);
        
            if(!response.ok){
                const error_message=await response.json();
                console.log(error_message);
                throw new Error(error_message);        
            }

            else{
                window.location.href=response.url;
            }
        
        }
        catch(err){
            setErrorState(()=>{
                throw err;
            });
        } //forzo il rerendering per attivare l'errorBoundary(che lavora in fase di rendering del genitore)

    }

    return(
        <form  className="accedi-form" action="/api/accedi" method="post" onSubmit={handleSubmit}>
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
            <input
                type="submit"
                value="Invia"       
            />
        </form>)
}
export default Accedi;