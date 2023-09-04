import{ useLoaderData } from "react-router-dom";
import CardExplorer from "./CardExplorer";

function RecipiesCardExplorer() {
    const ricette_scelte=useLoaderData();
    const ricette_len= ricette_scelte.length;
    return(
        <>
            <CardExplorer/>    
        </>
    )
}

export default RecipiesCardExplorer