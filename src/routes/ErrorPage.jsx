import { Link, useLocation, useRouteError } from "react-router-dom";

function ErrorPage(){
    const error=useRouteError();
    const error_data=JSON.parse(error.message);//parso la stringa con il messaggio di errore
    console.log(error_data);
    return(
        <div className='error-page'>
            <h1>Errore</h1>
            <img src={`Error${error_data.status}.jpg`} alt={error_data.message}/>
            <Link to='/'>Torna alla Homepage</Link>
        </div>
    )

}
export default ErrorPage;