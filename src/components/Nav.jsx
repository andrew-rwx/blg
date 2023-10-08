
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import TokenModal from './TokenModal';
import getJwtPayload from '../utils/getJwtPayload';

function Nav(){
    const[thereIsToken,setThereIsToken]=useState(false);
    const[username,setUsername]=useState("");
    useEffect(()=>{
        try{
            const token=localStorage.getItem("token");
            if(token){
                setThereIsToken(true);
                const payload=getJwtPayload(token);
                if(payload){
                    const username=payload.username;
                    setUsername(username);
                }
                else{
                    throw Error
                }    
            }   
        }
        catch(err){
            throw err;
        }
    },[])
    
    return(

            <nav>
                <div className="upper-nav"></div>
                <div className="nav-logo">
                    <img className="home-title-img-right" src="/water-lily.png" alt="lily" />
                    <p>La ninfea di Raganella</p>
                    <img className="home-title-img-right" src="/water-lily.png" alt="lily" />
                </div>
                <div className="navigation">
                    <Link to="/">🏠Home</Link>
                    <Link to="/ricette">🍱Ricette</Link>
                    {
                    thereIsToken?(
                        <Link to={`/paginapersonale/${username}`}>{username}</Link>
                        )
                        :(<Link to="/accedi">👤Accedi</Link>)
                    }
                </div>
            </nav>
    )
}

export default Nav;