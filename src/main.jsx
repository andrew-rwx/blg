import React from 'react'
import ReactDOM from 'react-dom/client'

import{
  createBrowserRouter,
  RouterProvider
}from "react-router-dom";

import './index.css';
import Homepage from './routes/Homepage.jsx'
import Ricette from './routes/Ricette.jsx'
import RecepiesCard from './components/RecepiesCard';
import SelectedRecepie from './components/SelectedRecepies';


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
        loader:async({params})=>{
          const id=params.id;
          try{
            const data=await fetch(`/api/${id}`);
            return data;
          }
          catch(e){
            console.log(e);
          }
        },
        path:"/ricette/:id",
        element:
          <RecepiesCard 
          />
      }
    
    ]

  },

  {path:"/ricette/:id/:id_ricetta",
       element:<SelectedRecepie/>
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
