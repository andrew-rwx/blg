import { useEffect, useState } from 'react';
import Card from  '../components/Card';
import Carosel from "../components/Carosel";
import "./Homepage.css"
import { Link } from "react-router-dom";
function Homepage(){

    //[] una volta per render verrà chiamato useEffect
        return(
        <>   
            <div className="home-title">
                <img className="home-title-img-right" src="/water-lily.png" alt="lily" />
                <h1>La ninfea di Raganella</h1>
                <img className="home-title-img-right" src="/water-lily.png" alt="lily" />
            </div>
        
                <Link to="/registrati">Registrati</Link>
                <Link to="/accedi">Accedi</Link>
              
            
            <div id="cards-container">
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
                <div className="card-wrapper">
                    <Card
                        src="mylife.jpg"
                        alt="La mia storia"
                        titolo="La mia storia 🐸"
                        testo="Qui troverai di tutto e di più su di me"/>
                    <Carosel />
                </div>
            </div>


        </>
      
    )
}

export default Homepage;