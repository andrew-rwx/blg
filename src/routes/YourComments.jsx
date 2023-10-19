import { useLoaderData } from "react-router-dom";

function YourComments(){
    console.log("ciao sono nel componente");
    const your_comments=useLoaderData() //array di commenti
    console.log("ciao sono nel container")
    console.log(your_comments);
    return(
        <div>
            {your_comments.map((comment,index)=>(
                <div key={index}>
                    <p>{comment.date}</p>
                    <p>{comment.username}</p>
                    <p>{comment.text}</p>
                </div>
            ))
            }
        </div>
    )
}

export default YourComments;