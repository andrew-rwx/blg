import { Link } from "react-router-dom";
import './CompErr.css';

function CompErr(){
    return(
        <div className="error-comp">
            <div className='error-component'>
                <img src={`Error500.jpg`} alt='Ooops,qualcosa non ha funzionato'/>
                <Link to='/'>Torna alla Homepage</Link>
            </div>
        </div>

    )
}
export default CompErr;