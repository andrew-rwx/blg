import { Link, useFetcher, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import {useEffect, useState } from "react";
import Nav from "./Nav";
import"./Nav.css";
import TokenModal from "./TokenModal";
import handleToken from "../utils/handleToken";
import getJwtPayload from "../utils/getJwtPayload";
import formatDateAndTime from "../utils/formatDateandTime";
import "./SelectedRecepie.css";
//todo gestire il render condizionale quando non ci sono commenti disponibili

function SelectedRecepie(event){
    //Hooks
    const data=useLoaderData();
    const location=useLocation();
    const navigate=useNavigate();
    const [errorState, setErrorState] = useState();//stato per il triggher dell'errorBoundary
    const[token_modal_hidden,setTokenModalHidden]=useState(true)

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
                else{//caso di navigazione non tramite Link
                    const response=await fetch(`/api/ricetta/${tiporicetta}/${id_ricetta}`,{
                        method:"POST"
                    });
                    if(response.ok){
                        const data=await response.json();//array contenente gli oggetti richiesti;
                        setRicetta(data.dati_ricetta);
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
    },[data]); //uso i dati del loader come criterio.La modifica di data corrisponde ad un refresh
               //esendo dati di un loader.
    

    async function writeComment(event){
        try{     
            event.preventDefault();
            //controllo la validità del token
            const token=localStorage.getItem("token");
            const token_valid=await handleToken(token); //validazione backend
            if(token_valid){
                const payload=getJwtPayload(token);//recupero token per ottenere username
                const date=new Date();
                const current_date=formatDateAndTime(date);
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
            else{
                console.log("token scaduto")
                setTokenModalHidden(false);//se token scaduto mostro la modale di accesso
            }
        }
        catch(err){
            //la fallback dell'ErrorBoundler mostra solo un 500 generico
            setErrorState(()=>{throw err})//triggher dell'errorBoundary 
        }    
    }

    return(
        <div className="ricetta-data">
            <Nav/>
            <h1>{ricetta.titolo}</h1>
            <div className="img-container">
                <img src={ricetta.src} alt={ricetta.alt}></img>
            </div>
            <div className="recepie-and-comments">
                <div className="preparazione-ricetta">
                    <h1>Preparazione:</h1>
                    <p>100 gr di farina...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas volutpat aliquet. Morbi tristique dui nunc, quis rhoncus libero malesuada sed. Nam suscipit erat eros, condimentum tempor orci euismod eu. Ut felis nulla, rutrum sed dapibus vel, tempor non lacus. Donec lobortis aliquam lacus ac dapibus. Phasellus eros purus, efficitur eu ullamcorper nec, sodales ac sem. Nulla et arcu a magna faucibus vehicula lacinia eleifend tellus. Nulla facilisi. Phasellus sagittis, lectus in sagittis sodales, purus lorem pulvinar sem, sed consectetur massa leo sed enim. In mattis erat nec vulputate pellentesque. Duis vulputate blandit viverra. Phasellus quis consequat dolor. Morbi vitae vulputate metus. Proin aliquet nunc quis lorem dignissim, ac bibendum lacus mattis.

    Proin euismod ipsum eros. Quisque consectetur, lectus id pellentesque accumsan, nisi nulla tempor orci, dapibus posuere purus magna eu nisi. Integer in turpis lacinia, convallis quam sit amet, lacinia est. Nam ullamcorper lacinia lorem, at sollicitudin eros vehicula vitae. Integer non neque sed urna posuere fermentum eu vel quam. Duis quis tortor cursus, facilisis sem vel, consequat justo. Maecenas pulvinar luctus bibendum. Vivamus consequat lacus eget orci feugiat pharetra. Praesent laoreet tellus nulla, sed facilisis nisl tincidunt vulputate. Nullam feugiat porttitor malesuada. Cras ac orci nec orci porta pulvinar id vel elit. Nulla malesuada tempus metus, in sodales nisi pharetra vitae. Duis fermentum interdum est at laoreet.</p>
                </div>
                    <div className="comments-and-write-comment">
                {
                    comments===no_comments?(
                        <div className="no-recepie-comment-box">
                            <h1>Commenti:</h1>
                            <div className="primo-a-commentare">
                                <p>{comments}</p>
                                <p>Sii il primo a commentare</p>
                            </div>
                        </div>
                    ):
                    (<div className="recepie-comment-box">
                        <h1>Commenti:</h1>
                        <div className="recepie-comment-list">
                        {comments.map((comment,index)=>(
                        <div className="recepie-comment"key={index}>
                            <div className="username-date-comment">
                                <div>{comment.username}</div>
                                <div>{comment.date}</div>
                            </div>
                            <div>{comment.text}</div>
                        </div>))
                        }
                        </div>
                        
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
                            disabled={comment_text===""}>
                            Invia 
                        </button>
                    </form>):
                    (<Link to="/">Accedi o registrati per commentare</Link>)
                }
                </div>
            </div>
            <TokenModal token_modal_hidden={token_modal_hidden} />
        </div>
    )
}

export default SelectedRecepie;