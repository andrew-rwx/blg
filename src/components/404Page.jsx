import { Link } from "react-router-dom";

function NotFoundPage(){
    return(
        
        <div className="not-found-page">
            <img src="/Error404.jpg" alt="La pagina che stai cercando non è disponibile!"/>
            <Link to="/">Torna alla Homepage</Link>
        </div>
    )
}
export default NotFoundPage;