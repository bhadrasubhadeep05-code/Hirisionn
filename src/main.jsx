import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AppProvider from './context/AppProvider';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./MainComponents/ScrollToTop.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop /> 
      
      <AppProvider>
        <App />
      </AppProvider>

    </BrowserRouter>
  </StrictMode>
);