import { useLocation } from "react-router-dom";


function SelectedRecepie(){
    const location=useLocation();
    const ricetta=location.state.ricetta;
    console.log(ricetta);
    return(
        <div>
            <div>
                <h1>{ricetta.titolo}</h1>
            </div>
            <img src={ricetta.src} alt={ricetta.alt}></img>
        </div>
    )
}

export default SelectedRecepie;