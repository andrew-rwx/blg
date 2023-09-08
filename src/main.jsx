import React from 'react'
import ReactDOM from 'react-dom/client'

import{
  createBrowserRouter,
  parsePath,
  RouterProvider,
  useLoaderData,
  useParams
}from "react-router-dom";

import './index.css';
import Homepage from './routes/Homepage.jsx'
import Ricette from './routes/Ricette.jsx'
import RecepiesCard from './components/RecepiesCard';
import SelectedRecepies from './components/SelectedRecepies';
import * as ricettario from './ricettario.js';

const router=createBrowserRouter([
  {
    path:"/",
    element:<Homepage />

  },
  {
    path:"/ricette",
    element:<Ricette/>,
    children:[
      { 
        loader:({params})=>{
          const {id}=params;
          const ricette_scelte=ricettario[id];
          console.log(ricette_scelte); /* il [] permette di accedere usando variabili. Non posso usare
                                                  ricettario.id */
          return ricette_scelte
        },
        path:"/ricette/:id",
        element:
          <RecepiesCard 
          />
        

      },

      {path:"/ricette/:id/api/:id-ricetta",
      loader: ()=>{},
       element:<SelectedRecepies/>}
   
    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
