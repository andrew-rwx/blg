import React from 'react';
import ReactDOM from 'react-dom/client';
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
import SelectedRecepie from './components/SelectedRecepie';
import Registrati from './routes/Registrati';
import Accedi from './routes/Accedi';
import PaginaPersonale from './routes/PaginaPersonale';
import NotFoundPage from './components/404Page';
import{loaderRecepiesCard,loaderSelectedRecepie,loaderHomePage}from "./loaders";
import './index.css';

//todo: prendere le loader function da loaders.js per chiarezza codice
const router=createBrowserRouter([

  { loader:function loaderHomePage(){
    const token=localStorage.getItem("token");
    if(token){
      const token_parts=token.split(".") //header-payload-signature
      if(token_parts.length===3){//len valida di un token
        const payload=JSON.parse(atob(token_parts[1]));
        console.log(payload);
        return payload;
      }
      else{
        throw new Error;
      }
    }
    else{return false}
  },
    path: "/",
    element:  <ErrorBoundary fallback={<CompErr/>}><Homepage /></ErrorBoundary>,
    errorElement:<ErrorPage/>

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
            const response=await fetch(`/api/ricette/${id}`);
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

  { loader:async({params})=>{
    try{
      const id_ricetta=params.id_ricetta;
      const response=await fetch('/api/loadcomments',{
        method:'POST',
        body:JSON.stringify(id_ricetta)
      })
      const data=await response.json();
      data.id_ricetta=id_ricetta;
      return data; //commenti + var connected=true/false
      }
      catch(err){
        throw new Response(err,{status:err.status});
      }
    },
    path: '/ricette/:id/:id_ricetta',
    element:  <SelectedRecepie/>,
    errorElement:<ErrorPage/>
  }, 

  {
    path: '/registrati',
    element:  <ErrorBoundary fallback={<CompErr/>}><Registrati/></ErrorBoundary>,
    errorElement:<ErrorPage/>

  },
  {
    path:'/accedi',
    element:<ErrorBoundary fallback={<CompErr/>}><Accedi/></ErrorBoundary>
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
