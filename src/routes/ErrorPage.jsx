import { useLoaderData } from "react-router-dom";

function ErrorPage(){
    const error_data=useLoaderData();
    console.log(error_data);
    return( <div className="error-page">
                <h1>{`Error:${error_data.status}`}</h1>
                <p>{error_data.message}</p>
           </div>
    )
}
export default ErrorPage;