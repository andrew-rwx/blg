import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function PaginaPersonale(){
    const location=useLocation();
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