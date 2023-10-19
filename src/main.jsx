import React from 'react';
import {lazy,Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import{
  createBrowserRouter,
  RouterProvider
}from "react-router-dom";

import ErrorBoundary from './components/ErrorBoundary';
import CompErr from './components/CompErr';
import ErrorPage from './routes/ErrorPage';
import NotFoundPage from './components/404Page';
import Homepage from './routes/Homepage.jsx';
import{loaderRecepiesCard,loaderSelectedRecepie,loaderHomePage,loaderPaginaPersonale,loaderYourComments}from "./loaders";
import './index.css';


//LAZY ROUTING: anche se il numero dei miei componenti non è cosi elevato è comunque una buona pratica implementare
//il lazy routing per migliorare l'esperienza all'utente


//GESTIONE ERRORI:
//401: gestito con errore element se loader,o con visualizzazione a schermo se nel componente 
//404:Route dedicata
//500: raggruppa molti errori per un approccio generico.Utilizzo ErrorElement se loader o ErrorBoundary se componente
//Errori interni nei componenti o errori di render dei componenti:ErrorBoundary
//TODO: gestire il 404 del backend
const router=createBrowserRouter([

  { loader:loaderHomePage,
    path: "/",
    element:<Homepage/>,
    errorElement:<ErrorPage/>

  },

  {
    path: "/ricette",
    lazy:async()=>{
      const Ricette=await import('./routes/Ricette');
      return {Component:Ricette.default};
      
    },
    children:[
      { 
        loader:loaderRecepiesCard,
        path: '/ricette/:tiporicetta',
        lazy:async()=>{
          const RecepiesCard=await import('./components/RecepiesCard');
          return {Component:RecepiesCard.default};
        },
        errorElement:<ErrorPage/>
      }
    
    ]

  },

  { loader:loaderSelectedRecepie,
    path: '/ricette/:tiporicetta/:id_ricetta',
    lazy:async()=>{
      const SelectedRecepie=await import('./components/SelectedRecepie');
      return {Component:SelectedRecepie.default};
    },
    errorElement:<ErrorPage/>
  }, 

  {
    path: '/registrati',
    lazy:async()=>{ const Registrati=await import('./routes/Registrati');
                    return{Component:Registrati.default}
    },
    errorElement:<ErrorPage/>

  },
  {
    path:'/accedi',
    lazy:async()=>{const Accedi=await import('./routes/Accedi');
                   console.log("fatto");
                   return{Component:Accedi.default}}
  },

  { loader:loaderPaginaPersonale,
    path:"/paginapersonale/:id",
    lazy:async()=>{
      const PaginaPersonale=await import ('./routes/PaginaPersonale');
      return{Component:PaginaPersonale.default};
    },
    errorElement:<ErrorPage/>,
    children:[
      { loader:loaderYourComments,
        path:"/paginapersonale/:id/your-comments",
        lazy:async()=>{
          const YourComments=await import('./routes/YourComments');
          console.log(YourComments.default);
          return{Component:YourComments.default}
        },
        errorElement:<ErrorPage/>
      }
    ]
  },

  {
    path:"*", /*404 route*/
    element:<NotFoundPage/>
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <ErrorBoundary fallback={<CompErr/>}><RouterProvider router={router}/></ErrorBoundary>
  </React.StrictMode>
)
