import React,{lazy,Suspense} from 'react';
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
const LazyRicette=lazy(()=>import('./routes/Ricette'));
const LazyRecepiesCard=lazy(()=>import('./components/RecepiesCard'));
const LazySelectedRecepie=lazy(()=>import('./components/SelectedRecepie'));
const LazyRegistrati=lazy(()=>import( './routes/Registrati'));
const LazyAccedi=lazy(()=>import('./routes/Accedi'));
const LazyPaginaPersonale=lazy(()=>import('./routes/PaginaPersonale'));
const LazyYourComments=lazy(()=>import('./routes/YourComments'));
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
    element:
            <ErrorBoundary fallback={<CompErr/>}>
            <Homepage />
            </ErrorBoundary>,
    errorElement:<ErrorPage/>

  },

  {
    path: "/ricette",
    element:  <Suspense><LazyRicette/></Suspense>,
    children:[
      { 
        loader:loaderRecepiesCard,
        path: '/ricette/:tiporicetta',
        element:  <Suspense><LazyRecepiesCard/></Suspense>,
        errorElement:<ErrorPage/>
      }
    
    ]

  },

  { loader:loaderSelectedRecepie,
    path: '/ricette/:tiporicetta/:id_ricetta',
    element: <Suspense><LazySelectedRecepie/></Suspense>,
    errorElement:<ErrorPage/>
  }, 

  {
    path: '/registrati',
    element:  <Suspense><LazyRegistrati/></Suspense>,
    errorElement:<ErrorPage/>

  },
  {
    path:'/accedi',
    element:<ErrorBoundary fallback={<CompErr/>}>
              <Suspense><LazyAccedi/></Suspense>
            </ErrorBoundary>
  },

  { loader:loaderPaginaPersonale,
    path:"/paginapersonale/:id",
    element:<Suspense><LazyPaginaPersonale/></Suspense>,
    errorElement:<ErrorPage/>,
    children:[
      { loader:loaderYourComments,
        path:"/paginapersonale/:id/your-comments",
        element:<Suspense fallback={console.log("sto caricando")}><LazyYourComments/></Suspense>,
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
  <RouterProvider router={router}/>
  </React.StrictMode>
)
