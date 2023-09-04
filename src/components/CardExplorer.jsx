import "./CardExplorer.css"

//TODO risolvere bug: quando il ricetteLen è divisibile per cardPerSlide genera una slide in più vuota

function CardExplorer( props ) {
    const numSlides = Math.floor(props.ricetteLen / props.cardPerSlide); //calcola il numero di "slides" di card esplorabili
    const buttons=[]

    for(let i=0; i <= numSlides; i++){
        buttons.push(
            <button key={i+1} onClick={() => props.setIndex(i)}>
                {i+1}
            </button>
        )
    }

    return (
        <div className="card-explorer">{buttons}</div>    
    )
}

export default CardExplorer