import './Card.css'

function Card(props){
    return(
    <div className="card">
        <h2>{props.titolo}</h2>
        <div id="card-img-wrapper"><img src={props.src} alt={props.alt} /></div>
        <p>{props.introduzione}</p>
    </div>
    )
}

export default Card;