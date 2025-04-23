import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import App from './App.jsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import './index.css'
import { store } from './app/store.js';
import { Provider } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import LeadManager from './pages/LeadManager.jsx';
// import { Provider } from 'react-redux'


const router = createBrowserRouter([

  {

    path: "/", element: <App />, children: [
      { path: "/", element: <Home /> },
      { path: "/:component", element: <Home /> },
      { path: "/:leadAction/:leadId", element: <LeadManager /> },
      { path: "*", element: <Navigate to={'/'} /> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Toaster position="top-center" />
    <RouterProvider router={router}>
    </RouterProvider>
  </Provider>
)
