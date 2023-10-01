import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import handleToken from "../utils/handleToken";
import getJwtPayload from "../utils/getJwtPayload";
//todo gestire il render condizionale quando non ci sono commenti disponibili

function SelectedRecepie(event){
    //Hooks
    const data=useLoaderData();
    const location=useLocation();
    const navigate=useNavigate();
    const [errorState, setErrorState] = useState();//stato per il triggher dell'errorBoundary
    const[comment,setComment]=useState({text:""});//text commento

    const ricetta=location.state.ricetta; //recupero informazioni sulla ricetta



    const id_ricetta=data.id_ricetta;
    const comments=data.comments;
    const foundtoken=data.foundtoken;
    const no_comments="Non ci sono commenti disponibili";
    
    
    
                                            



    function createComment(event){
        setComment({
            text:event.target.value
        });
    }

    async function writeComment(event){
        try{     
            event.preventDefault();
            //controllo la validità del token
            const token=localStorage.getItem("token");
            console.log(token);
            const token_valid=await handleToken(token); //validazione backend
            if(token_valid){
                const payload=getJwtPayload(token);//recupero token per ottenere username
                const current_date=new Date();
                const comment_info={
                    date:current_date,
                    username:payload.username,
                    text:comment.text
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
                    value={comment.text}
                
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