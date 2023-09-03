import { Link, Outlet } from "react-router-dom";
import "./Ricette.css"
function Ricette(){
    
    return(
        <div id="ricette-wrapper">
            <ul>
                <li>
                    <Link to="/ricette/primipiatti">Primi Piatti</Link>
                </li>

                <li>
                    <Link to="/ricette/secondipiatti">Secondi Piatti</Link>
                </li>
                <li>
                    <Link to="/ricette/contorni">Contorni</Link>
                </li>

                <li>
                    <Link to="/ricette/dolci">Dolci</Link>
                </li>

                <li>
                    <Link to="/ricette/spuntini">Spuntini</Link>
                </li>

                
            </ul>

            <div id="ricette-card-wrapper">
                <Outlet/>
            </div>
            

        </div>
    )
}

export default Ricette;
