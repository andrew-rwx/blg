import React from 'react'
import ReactDOM from 'react-dom/client'

import{
  createBrowserRouter,
  RouterProvider
}from "react-router-dom";


import ErrorBoundary from './components/ErrorBoundary';
import CompErr from './components/CompErr';
import ErrorPage from './routes/ErrorPage';
import Homepage from './routes/Homepage.jsx';
import Ricette from './routes/Ricette.jsx'
import RecepiesCard from './components/RecepiesCard';
import SelectedRecepie from './components/SelectedRecepies';
import Registrati from './routes/Registrati';
import PaginaPersonale from './routes/PaginaPersonale';
import NotFoundPage from './components/404Page';
import './index.css';


const router=createBrowserRouter([

  {
    path: "/",
    element:  <ErrorBoundary fallback={<CompErr/>}><Homepage /></ErrorBoundary>,

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
            const response=await fetch(`/api/${id}`);
            if(!response.ok){
              const error_message=await response.json();
              throw new Response(error_message,{status:response.status});
            }
            else{
              const data=await response.json();
              return data;
            }
          }
          catch(err){
            throw new Response(err,{status:err.status});
          }  
      },
        path: '/ricette/:id',
        element:  <RecepiesCard />,
        errorElement:<ErrorPage/>
      }
    
    ]

  },

  { path: '/ricette/:id/:id_ricetta',
    element:  <SelectedRecepie/>
  }, 

  {
    path: '/registrati',
    element:  <ErrorBoundary fallback={<CompErr/>}><Registrati/></ErrorBoundary>,
    errorElement:<ErrorPage/>

  },

  {
    path:'/paginapersonale/:id',
    element:<PaginaPersonale/>
  },

  {
    path:"*", /*404 route*/
    element:<NotFoundPage/>
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
  </React.StrictMode>
)
