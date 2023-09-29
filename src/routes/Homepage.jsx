import { useEffect, useState } from 'react';
import Card from  '../components/Card';
import Carosel from "../components/Carosel";
import "./Homepage.css"
import { Link, useLoaderData } from "react-router-dom";
function Homepage(){
    const user_data=useLoaderData();
    //[] una volta per render verrà chiamato useEffect
        return(
        <>   
            <div className="home-title">
                <img className="home-title-img-right" src="/water-lily.png" alt="lily" />
                <h1>La ninfea di Raganella</h1>
                <img className="home-title-img-right" src="/water-lily.png" alt="lily" />
            </div>
                {user_data===false?
                    (<React.Fragment>
                        <Link to="/registrati">Registrati</Link>
                        <Link to="/accedi">Accedi</Link>
                    </React.Fragment>
                        )
                    :(<Link to={`/paginapersonale/${user_data.username}`}>{user_data.username}</Link>)
                }
              
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