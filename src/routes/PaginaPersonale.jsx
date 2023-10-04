import { useState,useEffect } from "react";
import { useLocation,useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import getJwtPayload from "../utils/getJwtPayload";

function PaginaPersonale(){
    const token=useLoaderData();
    const location=useLocation();
    const[user,setUser]=useState({
        username:"",
        email:"",
        commenti:{}
    });
    useEffect(()=>{
        async function fetchData(){
            const payload=getJwtPayload(token);
            const {username,email}=payload;
            const user_comment=await fetch(`/api/load_user_comments/${username}`,{
                method:"POST"
            });
            setUser({
                ...user,
                username:username,
                email:email
            });
        }
        fetchData();

    }  ,[]);
    function userLogout(event){
        localStorage.removeItem("token"); //procedura di logout
    }
    return(
        <div className="paginapersonale">
            <h1>{`Benvenuto nel tuo proifilo${user.username}`}</h1>
            <Link to="/" onClick={userLogout}>Logout</Link>
            <div className="right-user-menu">
                <ul>
                    <li>"Informazioni generali"</li>
                    <li>I tuoi commenti</li>
                </ul>
            </div>
        </div>
    )
}

export default PaginaPersonale;