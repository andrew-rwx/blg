import { useState } from "react";
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
            const data=await response.json();
            console.log(response);
            if(response.ok){
                const token=data.token;
                localStorage.setItem("token",token);
                navigate("/"); //imposto token  e mi dirigo alla home
            }
            if(response.status===401){
                const loginfaild_msg=data.message;
                setLoginError(loginfaild_msg); //inserisco messaggio di errore Username o password invalidi      
            }
        
        }
        catch(err){
            setErrorState(()=>{
                throw err;
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