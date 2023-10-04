import {Link} from "react-router-dom";
function TokenModal(props){
    return(
        <div className={`login-modal-${props.token_modal_hidden?"hidden":"view"}`} hidden={props.token_modal_hidden}>
            <div className="login-modal-text">
                <p>La tua connessione è scaduta</p>
                <Link to="/accedi">Effettua nuovamente l'accesso</Link>
                <p>oppure</p>
                <Link to="/">Torna alla Home</Link>
            </div>
        </div>  
    )
}
export default TokenModal;