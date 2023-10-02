import { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function PaginaPersonale(){
    const location=useLocation();
    cost[user,setUser]=useState({});
    useEffect(()=>{
        async function fetchData(){
            try{
                if(location.state&&location.state.user_data){
                    setUser(location.state.ricetta); //caso in cui si è passati dal Link in RecepiesCard
                }
                else{
                    
                    const response_user=await fetch("")

                    const response=await fetch(`/api/ricetta/${tiporicetta}/${id_ricetta}`,{
                        method:"POST"
                    });
                    if(response.ok){
                        const data=await response.json();//array contenente gli oggetti richiesti;
                        console.log("rimonto il componente");
                        console.log(comment_text);
                        setRicetta(data.dati_ricetta);
                    }
                    else{
                        const error_message=await response.json();
                        throw error_message
                    }
                }
            }
            catch(err){
                setErrorState(()=>{
                    throw err})
            }
        }
        fetchData();

    }  ,[current_location]);
    const user=location.state.user_data;//prendo i valori dal token passati da state da Homepage
    
    function userLogout(event){
        localStorage.removeItem("token"); //procedura di logout
    }
    return(
        <div className="paginapersonale">
            <h1>{`Benvenuto nel tuo proifilo${user.username}`}</h1>
            <Link to="/" onClick={userLogout}>Logout</Link>
            <div className="right-user-menu">
                <ul>
                    <li>"Informazioni generali"</li>
                    <li>I tuoi commenti</li>
                </ul>
            </div>
        </div>
    )
}

export default PaginaPersonale;