import { Link, useFetcher, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import handleToken from "../utils/handleToken";
import getJwtPayload from "../utils/getJwtPayload";
//todo gestire il render condizionale quando non ci sono commenti disponibili

function SelectedRecepie(event){
    //Hooks
    const data=useLoaderData();
    const location=useLocation();
    const navigate=useNavigate();
    const [errorState, setErrorState] = useState();//stato per il triggher dell'errorBoundary

    //RICETTA 
    const current_location=location.pathname;
    const[ricetta,setRicetta]=useState({});
    const id_ricetta=data.id_ricetta; //recupero informazioni sulla ricetta
    const {tiporicetta}=useParams();
    useEffect(()=>{
        async function fetchData(){
            try{
                if(location.state&&location.state.ricetta){
                    setRicetta(location.state.ricetta); //caso in cui si è passati dal Link in RecepiesCard
                }
                else{
                    const response=await fetch(`/api/ricetta/${tiporicetta}/${id_ricetta}`,{
                        method:"POST"
                    });
                    if(response.ok){
                        const data=await response.json();//array contenente gli oggetti richiesti;
                        setRicetta(data.dati_ricetta);
                        location.state.ricetta=data.dati_ricetta;
                    }   
                    else{
                        const error_message=await response.json();
                        throw error_message
                    }
                }
            }
            catch(err){
                setErrorState(()=>{
                    throw err})
            }
        }
        fetchData();

    },[]);


    //COMMENTI
    const comments=data.comments;
    const foundtoken=data.foundtoken;
    const[comment_text,setCommentText]=useState("");//text commento
    const no_comments="Non ci sono commenti disponibili";
    function createComment(event){setCommentText(event.target.value)};
    useEffect(()=>{
        setCommentText("");
    },[data]); //uso i dati del loader come criterio
    

    async function writeComment(event){
        try{     
            event.preventDefault();
            //controllo la validità del token
            const token=localStorage.getItem("token");
            const token_valid=await handleToken(token); //validazione backend
            if(token_valid){
                const payload=getJwtPayload(token);//recupero token per ottenere username
                const current_date=new Date();
                const comment_info={
                    date:current_date,
                    username:payload.username,
                    text:comment_text
                }

                const data_comment={
                id_ricetta:id_ricetta,
                comment_info:comment_info
                }

                const response=await fetch("/api/writecomment",{
                method:"PUT",
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({data_comment:data_comment})//costruisco l'oggetto considerato da 
                                                   //id_ricetta+commento
                });
                if(response.ok){
                    navigate(current_location);//aggiorno la pagina per rendere visibile il nuovo commento
                }
                else{
                    throw new Error(data); //error 500 del backend con messaggio personalizzato middleware
                }
        
            }
        }
        catch(err){
            //la fallback dell'ErrorBoundler mostra solo un 500 generico
            setErrorState(()=>{throw err})//triggher dell'errorBoundary 
        }    
    }

    return(
        <div>
            <div>
                <h1>{ricetta.titolo}</h1>
            </div>
            <img src={ricetta.src} alt={ricetta.alt}></img>
            <p>100 gr di farina...</p>
            {
                comments===no_comments?(
                    <div className="no-recepie-comment-box">
                    <p>{comments}</p>
                    <p>Sii il primo a commentare</p>
                    </div>
                ):
                (<div className="recepie-comment-box">
                    {comments.map((comment,index)=>(
                    <div className="recepie-comment"key={index}>
                        <div>{comment.username}</div>
                        <div>{comment.date}</div>
                        <div>{comment.text}</div>
                    </div>))
                    }
                </div>)
            }
            {foundtoken?
            (<form className="write-comment" onSubmit={writeComment}>
                <textarea 
                    onChange={createComment}
                    id="user-comment"
                    name="comment"
                    placeholder="Commenta questa ricetta..."
                    value={comment_text}
                
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