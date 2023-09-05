import { useState } from "react";
import "./CardExplorer.css"

//TODO risolvere bug: quando il ricetteLen è divisibile per cardPerSlide genera una slide in più vuota

function CardExplorer( props ) {
    const [buttonClicked,setButtonClicked]=useState(false);
    const handleClick=()=>{
        setButtonClicked(true);
    }
    const checknumeSlides=props.cardsLen % props.cardPerSlide===0;
    console.log(checknumeSlides)
    const numSlides = Math.ceil(props.cardsLen/ props.cardPerSlide); //calcola il numero di "slides" di card esplorabili
    const buttons=[]
    for(let i=1; i <= numSlides; i++){
        buttons.push(
             <button key={i} className={`my-button"${buttonClicked ? 'clicked' : ''}`}
                 onClick={() => {props.setIndex(i);
                                 handleClick()}}>
                 {i}
            </button>
        )
    }

    return (
        <div className="card-explorer">{buttons}</div>    
    )
}

export default CardExplorer