import { set } from "mongoose";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


function Accedi(){
    const [errorState, setErrorState] = useState();

    const [utente,setUtente]=useState({
        username: '',
        password:''
    });

    const[loginError,setLoginError]=useState("");


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
            if(response.ok){
                const token_data=await response.json(); //contiene il token
                const token=token_data.token;
                localStorage.setItem("token",token);
                navigate("/"); //imposto token  e mi dirigo alla home
            }
            if(response.status===401){
                const fail_msg=await response.json();
                const loginfailed_msg=fail_msg.message; //campo msg dell'oggetto inviato da handlerError dal backend
                setLoginError(loginfailed_msg);//inserisco messaggio di errore Username o password invalidi      
            }
            if(response.status===500){
                const backend_error=await response.json();
                throw new Error(JSON.stringify(backend_error));
            }
        
        }
        catch(err){
            setErrorState(()=>{
                throw err; //errore 500 o del frontend o del backend
            });
        } //forzo il rerendering per attivare l'errorBoundary(che lavora in fase di rendering del genitore)

    }

    return(
        <>
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
                disabled={(utente.username === '' || utente.password === '') ? true : false}       
            />
        </form>
        <div className="login-error">
            {loginError}
        </div>
        </>)
}
export default Accedi;