import{ unstable_HistoryRouter, useLoaderData, useLocation, useNavigate, useParams }from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "./Card";
import CardExplorer from "./CardExplorer";
import { Link } from "react-router-dom";


function RecepiesCard(){
    const [currentIndex, setCurrentIndex] = useState(1);
    function handleSetCurrentIndex(newIndex){
      setCurrentIndex(newIndex);
  }

  const ricetteScelte=useLoaderData();
  //console.log(ricetteScelte);
  const ricetteLen= ricetteScelte.length;
  const cardPerSlide = 4; //TODO risolvere bug in CardExplorer: quando il ricetteLen è divisibile per cardPerSlide genera una slide in più vuota

    //riazzero lo stato ad ogni cambio di route per la corretta gestione
  const location=useLocation();
  const currentUrl=location.pathname;
  useEffect(()=>{
      handleSetCurrentIndex(1);
    },[currentUrl]
  );

    //--------//

    const cardIndex =(currentIndex* cardPerSlide)- cardPerSlide;
    const ricetteVisualizzate = ricetteScelte.slice(cardIndex, cardIndex + cardPerSlide);

    return(<div className="ricette-outlet-container">
              <div id="ricette-card-wrapper">
                {
                    ricetteVisualizzate.map((ricetta, index)=>(
                        <Link to={`${currentUrl}/${ricetta._id}`}key={{index}} state={{ricetta}}>
                        <Card
                        key={index}
                        titolo={ricetta.titolo}
                        src={ricetta.src}
                        alt={ricetta.alt}
                        introduzione={ricetta.introduzione}
                        ingredienti={ricetta.ingredienti}
                        preparazione={ricetta.preparazione}
                        />
                        </Link>
                    ))
                }
              </div>

                  <CardExplorer 
                    setIndex={handleSetCurrentIndex}
                    cardsLen={ricetteLen}
                    cardPerSlide={cardPerSlide}
                  />
          </div>
        )
  }

  export default RecepiesCard;