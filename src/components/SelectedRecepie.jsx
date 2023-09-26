import { useLoaderData, useLocation } from "react-router-dom";


function SelectedRecepie(event){
    const comments=useLoaderData();
    const location=useLocation();
    const ricetta=location.state.ricetta;
    async function writeComment(event){
        event.preventDefault();
        const date=new Date();
        /*todo: costruire data del commento quando inviato*/
        const response=await fetch("/api/writecomment",{
            method:"POST",
            body:JSON.stringify()
        })
        
    }
    return(
        <div>
            <div>
                <h1>{ricetta.titolo}</h1>
            </div>
            <img src={ricetta.src} alt={ricetta.alt}></img>
            <div className="recepie-comment-box">
                {comments.map((comment,index)=>{
                <div className="recepie-comment"key={index}>
                    <div>{comment.name}</div>
                    <div>{comment.text}</div>
                </div>})
                }
            </div>
            <form className="write-comment" onSubmit={writeComment}>
                <textarea 
                    id="user-comment"
                    name="comment"
                    placeholder="Commenta questa ricetta..."
                
                />
                <button 
                    type="submit"
                    value="Scrivi un commento"
                    />
            </form>
            
        </div>
    )
}

export default SelectedRecepie;