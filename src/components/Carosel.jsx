import { useState } from "react"
import lista_immagini from"../data";
import './Carosel.css';
import './Card.css';

function Carosel(){
    const immagini = [];
    lista_immagini.forEach(immagine=> immagini.push(immagine));
    const max_index_immagini=immagini.length-4;
    const [index,setIndex]=useState(0);
    let hasPrev = index > 0;
    let hasNext = index <  max_index_immagini
    

    function handleNextClick(){
        console.log("click-avventuo");
        console.log(hasNext);
        if(hasNext){
            setIndex(index+1);
        }
    }

    function handlePrevClick(){
        if (hasPrev){
            setIndex(index-1);
        } 
    }


    return(
        <div className="carosel">
            
            <div className="carosel-imgs">
                <button id="indietro" onClick={handlePrevClick} disabled={index === 0}>&lt;</button>

                {immagini.slice(index, index + 4).map((immagine, currentIndex) => (
                <img src={immagine} alt={`Immagine ${index}` } key={currentIndex} />
                ))}

            <button id="avanti" onClick={handleNextClick} disabled={index === max_index_immagini}>&gt;</button>
            </div>
        </div>
    )
}

export default Carosel;