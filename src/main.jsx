import React from 'react';
import ReactDOM from 'react-dom/client';
import{
  createBrowserRouter,
  RouterProvider
}from "react-router-dom";


import ErrorBoundary from './components/ErrorBoundary';
import HomeErr from './components/HomeErr';
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
import{loaderRecepiesCard,loaderSelectedRecepie,loaderHomePage,loaderPaginaPersonale}from "./loaders";
import './index.css';


//GESTIONE ERRORI:
//401: gestito con errore element se loader,o con visualizzazione a schermo se nel componente 
//404:Route dedicata
//500: raggruppa molti errori per un approccio generico.Utilizzo ErrorElement se loader o ErrorBoundary se componente
//Errori interni nei componenti o errori di render dei componenti:ErrorBoundary
//TODO: gestire il 404 del backend
const router=createBrowserRouter([

  { loader:loaderHomePage,
    path: "/",
    element:  <ErrorBoundary fallback={<HomeErr/>}><Homepage /></ErrorBoundary>,
    errorElement:<ErrorPage/>

  },
  
  {
    path: "/ricette",
    element:  <Ricette/>,
    children:[
      { 
        loader:loaderRecepiesCard,
        path: '/ricette/:tiporicetta',
        element:  <RecepiesCard />,
        errorElement:<ErrorPage/>
      }
    
    ]

  },

  { loader:loaderSelectedRecepie,
    path: '/ricette/:tiporicetta/:id_ricetta',
    element:  <ErrorBoundary fallback={<CompErr/>}><SelectedRecepie/></ErrorBoundary>,
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

  { loader:loaderPaginaPersonale,
    path:'/paginapersonale/:id',
    element:<PaginaPersonale/>,
    errorElement:<ErrorPage/>
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
