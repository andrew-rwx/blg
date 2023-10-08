import { useEffect, useState } from 'react';
import React from 'react';
import Card from  '../components/Card';
import Carosel from "../components/Carosel";
import "./Homepage.css"
import { Link, useLoaderData } from "react-router-dom";
//il link a pagina personale non ha validazioni nel loader di homepage perché viene validato quando cliccato
function Homepage(){
    const user_data=useLoaderData(); //dati utenti estratti dal payload del token
    function logout(event){
        localStorage.removeItem("token");
    }
        return(
        <div id="homepage">   
            <div className="home-title">
                <img className="home-title-img-right" src="/water-lily.png" alt="lily" />
                <h1>La ninfea di Raganella</h1>
                <img className="home-title-img-right" src="/water-lily.png" alt="lily" />
            </div>
                {user_data===false?
                    (<div className="accedi-registrati">
                        <Link to="/registrati" id="registrati">Registrati</Link>
                        <Link to="/accedi" id="accedi">Accedi</Link>
                    </div>
                        )
                    :(  <div className="username-disconnetti">
                            <Link to={`/paginapersonale/${user_data.username}`} state={user_data}>{user_data.username}</Link>
                            <Link to="/" onClick={logout}>Sconnettiti</Link>
                        </div>)
                }
              
            <div className="card-container1">
                <div className="card-wrapper">
                    <Link to="/ricette">
                    <Card
                        src="/toast.jpeg"
                        alt="Una ricetta gustosa"
                        titolo="Ricette 🥑"
                        testo="Qui troverai tante ricette interessanti,buone e assolutamente vegane."
                    />
                    </Link>
                    

                    <Carosel />

                </div>
            </div>
            <div className="card-container2">
                <div className="card-wrapper">
                    <Card
                        src="mylife.jpg"
                        alt="La mia storia"
                        titolo="La mia storia 🐸"
                        testo="Qui troverai di tutto e di più su di me"/>
                    <Carosel />
                </div>
            </div>


        </div>
      
    )
}

export default Homepage;