import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AppProvider from './context/AppProvider';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./MainComponents/ScrollToTop.jsx";
import { inject } from '@vercel/analytics';
import AlertNotification from "./MainComponents/AlertNotification.jsx";

inject();

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ScrollToTop /> 
      
      <AppProvider>
        <AlertNotification>
          <App />
        </AlertNotification>
      </AppProvider>

    </BrowserRouter>
);