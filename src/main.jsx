import React from 'react'
import ReactDOM from 'react-dom/client'

import{
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
  useParams
}from "react-router-dom";

import './index.css';
import Homepage from './routes/Homepage.jsx'
import Ricette from './routes/Ricette.jsx'
import Card from './components/Card.jsx'
import * as ricettario from './ricettario.js';

export function RecepiesCard(){
  const ricette_scelte=useLoaderData();
  return(<>
            
                {ricette_scelte.map((ricetta)=>(
                  <Card
                    titolo={ricetta.titolo}
                    src={ricetta.src}
                    alt={ricetta.alt}
                    testo={ricetta.testo}
                 />
                ))
                }
          </>
        )
}

const router=createBrowserRouter([
  {
    path:"/",
    element:<Homepage />

  },
  {
    path:"/ricette",
    element:<Ricette/>,
    children:[{
      loader:({params})=>{
        const {id}=params;
        const ricette_scelte=ricettario[id]; /* il [] permette di accedere usando variabili. Non posso usare
                                                ricettario.id */
        return ricette_scelte
      },
      path:"/ricette/:id",
      element:<RecepiesCard/>
    }]
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
