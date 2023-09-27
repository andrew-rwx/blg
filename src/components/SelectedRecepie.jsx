import { Link, useLoaderData, useLocation } from "react-router-dom";
//todo: come prendere nome utente,
//come rendere lo var connected globale
// controllo tipo array in modello RecComment

function SelectedRecepie(event){
    const{comments,connected,id_ricetta}=useLoaderData();
    const location=useLocation();
    const ricetta=location.state.ricetta;

    const[comment,setComment]=useState({
        name:"", //username di chi commenta
        date:"", //todo gestire date come un oggetto
        text:"" //text commento
    });
    async function writeComment(event){
        event.preventDefault();
        const date=new Date();
        /*todo: costruire data del commento quando inviato*/
        const response=await fetch("/api/writecomment",{
            method:"PUT",
            body:JSON.stringify({id_ricetta:id_ricetta})
        });
        
    }
    return(
        <div>
            <div>
                <h1>{ricetta.titolo}</h1>
            </div>
            <img src={ricetta.src} alt={ricetta.alt}></img>
            <p>100 gr di farina...</p>
            <div className="recepie-comment-box">
                {comments.map((comment,index)=>{
                <div className="recepie-comment"key={index}>
                    <div>{comment.name}</div>
                    <div>{comment.text}</div>
                </div>})
                }
            </div>
            {connected?
            (<form className="write-comment" onSubmit={writeComment}>
                <textarea 
                    id="user-comment"
                    name="comment"
                    placeholder="Commenta questa ricetta..."
                
                />
                <button 
                    type="submit"
                    value="Scrivi un commento"
                    />
            </form>):
            (<Link to="/">Accedi o registrati per commentare</Link>)
            }
            
        </div>
    )
}

export default SelectedRecepie;