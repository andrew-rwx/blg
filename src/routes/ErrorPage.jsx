import { Link, useLocation, useRouteError } from "react-router-dom";

function ErrorPage(){
    const error=useRouteError();
    const error_structure=(
        <div className='error-page'>
            <img src={`Error${error.status}.jpg`} alt={error.message}/>
            <Link to='/'>Torna alla Homepage</Link>
        </div>
    )
    {error.status===404?
        error_structure
        :    
        error_structure
    

    }
}
export default ErrorPage;