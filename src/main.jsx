import React from 'react'
import ReactDOM from 'react-dom/client'

import{
  createBrowserRouter,
  RouterProvider
}from "react-router-dom";

import './index.css';
import Homepage from './routes/Homepage.jsx';
import ErrorPage from './routes/ErrorPage';
import Ricette from './routes/Ricette.jsx'
import RecepiesCard from './components/RecepiesCard';
import SelectedRecepie from './components/SelectedRecepies';
import Registrati from './routes/Registrati';


const router=createBrowserRouter([
  {
    path: "/",
    element:  <Homepage />,

  },

  { loader:async()=>{   
      try{  
            console.log("Hi");
            const error_data=await fetch("/api/error");
            console.log("done");
            return error_data;
      }
      catch(e){
        console.log(e)
      };
    },
    
    path:"/errorpage",
    element:<ErrorPage/>,
    
  },
  {
    path: "/ricette",
    element:  <Ricette/>,
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
        path: "/ricette/:id",
        element:  <RecepiesCard />
      }
    
    ]

  },

  { path: "/ricette/:id/:id_ricetta",
    element:  <SelectedRecepie/>
  },

  {
    path: "/registrati",
    element:  <Registrati/>

  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
