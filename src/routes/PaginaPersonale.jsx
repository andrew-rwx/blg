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
                const payload=getJwtPayload(token);
                const {username,email}=payload;
                setUser({
                    ...user,
                    username:username,
                    email:email}
                );
             },[]);
             
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
                    <Link to={`${location.pathname}/your-comment`}>I tuoi commenti</Link>
                </ul>
            </div>
        </div>
    )
}

export default PaginaPersonale;