import{ useLoaderData }from "react-router-dom";
import { useState } from "react";
import Card from "./Card";
import CardExplorer from "./CardExplorer";


function RecepiesCard(){
    const ricetteScelte=useLoaderData();
    const ricetteLen= ricetteScelte.length;
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardPerSlide = 3; //TODO risolvere bug in CardExplorer: quando il ricetteLen è divisibile per cardPerSlide genera una slide in più vuota

    function handleSetCurrentIndex(newIndex){
        setCurrentIndex(newIndex);
    }
    const cardIndex = currentIndex*cardPerSlide;
    const ricetteVisualizzate = ricetteScelte.slice(cardIndex, cardIndex + cardPerSlide);

    return(<div className="ricette-outlet-container">
              <div id="ricette-card-wrapper">
                {
                    ricetteVisualizzate.map((ricetta, index)=>(
                        <Card
                        key={index}
                        titolo={ricetta.titolo}
                        src={ricetta.src}
                        alt={ricetta.alt}
                        testo={ricetta.testo}
                        />
                    ))
                }
              </div>

                  <CardExplorer 
                    setIndex={handleSetCurrentIndex}
                    ricetteLen={ricetteLen}
                    cardPerSlide={cardPerSlide}
                  />
            </div>
          )
  }

  export default RecepiesCard;