import { Link } from "react-router-dom";


function HomeErr(){
    return(
        <div className="error-comp">
            <div className='error-component'>
                <img src={`Error500.jpg`} alt='Ooops,qualcosa non ha funzionato'/>
                <Link to="/">Riprova</Link>
            </div>
        </div>

    )
}
export default HomeErr;