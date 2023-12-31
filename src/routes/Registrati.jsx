import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import "./Registrati.css";


function Registrati(){
    const [errorState, setErrorState] = useState();

    const [utente,setUtente]=useState({
        username: '',
        password:'',
        email:''
    })

    const[signupError,setSignupError]=useState('');

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
            const response=await fetch("/api/registrazione",{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(utente)
            });
            if(response.ok){
                const registration_response=await response.json();
                const token=registration_response.registration_result;
                localStorage.setItem("token",token);
                navigate("/");
            }
    
            if(response.status===400){
                    const error_message=await response.json();
                    setSignupError(error_message.message);
            }

            if(response.status===500){
                const backend_erro=await response.json();
                throw new Error(error_message);
            }
            
        
        }
        catch(err){
            setErrorState(()=>{
                throw err;
            });
        } //forzo il rerendering per attivare l'errorBoundary(che lavora in fase di rendering del genitore)

    }
            
    return( <div className="pagina-registrazione">
                <Nav/>
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
                        type="password"
                        name="password"
                        value={utente.password}
                        onChange={handleInputChange}
                    />
                    
                    <label htmlFor="mail" >Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={utente.email}
                        onChange={handleInputChange}
                    />

                    <input
                        type="submit"
                        value="Invia"
                        disabled={(utente.username === '' || utente.password === '') ? true : false}         
                    />

                </form>
                <div className="signup-error">{signupError}</div>
            </div>
        
    )
}

export default Registrati;