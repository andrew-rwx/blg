import { useLoaderData } from "react-router-dom";


function SelectedRecepie(){
    const target_recepies=useLoaderData();
    console.log(target_recepies);
    return(
        <div>
            <h1>{target_recepies.titolo}</h1>
        </div>
    )
}

export default SelectedRecepie;