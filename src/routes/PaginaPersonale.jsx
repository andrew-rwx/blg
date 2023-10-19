import { useState,useEffect } from "react";
import { useLocation,useLoaderData,useNavigate} from "react-router";
import { Link,Outlet } from "react-router-dom";
import getJwtPayload from "../utils/getJwtPayload";

function PaginaPersonale(){
    const token=useLoaderData();
    const location=useLocation();
    const currentlocation=location.pathname;
    const navigate=useNavigate();
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
             
    function userLogout(){
        localStorage.removeItem("token"); //procedura di logout
        navigate("/");
    }
    return(
        <div className="paginapersonale">
            <h1>{`Benvenuto nel tuo proifilo${user.username}`}</h1>
            <Link to="/" onClick={userLogout}>Logout</Link>
            <div className="right-user-menu">
                <ul>
                    <li>"Informazioni generali"</li>
                    <Link to={`${currentlocation}/your-comments`}>I tuoi commenti</Link>
                </ul>
            </div>
            <Outlet/>
        </div>
    )
}

export default PaginaPersonale;