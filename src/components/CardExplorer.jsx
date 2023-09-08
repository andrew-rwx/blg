import { useEffect, useState } from "react";
import "./CardExplorer.css"
import { useLocation } from "react-router-dom";

//TODO risolvere bug: quando il ricetteLen è divisibile per cardPerSlide genera una slide in più vuota

function CardExplorer( props ) {
    const numSlides = Math.ceil(props.cardsLen/ props.cardPerSlide); //calcola il numero di "slides" di card esplorabili
    //creo l'array degli stati iniziali dei button
    const initialButtonStates=[];
    for(let i=1; i <= numSlides; i++){
        initialButtonStates.push(false)}
    //assegno l'array dello stato dei button come stato iniziale di useState
    const [nButtonClicked,setButtonClicked]=useState(initialButtonStates);
    const handleClick=(index)=>{
        const newButtonStates=[...initialButtonStates];
        newButtonStates[index]=!newButtonStates[index];
        setButtonClicked(newButtonStates);
        
    }
    //gestione del reset degli stati in caso di cambio route
    const location=useLocation()
    useEffect(()=>{
        setButtonClicked(initialButtonStates);
    },[location.pathname])


    const buttons=[]
    for(let i=1; i <= numSlides; i++){
        buttons.push(
             <button key={i} className={`my-button${nButtonClicked[i] ? 'clicked' : ''}`}
                 onClick={() => {props.setIndex(i);
                                 handleClick(i)}}>
                 {i}
            </button>
        )
    }

    return (
        <div className="card-explorer">{buttons}</div>    
    )
}

export default CardExplorer