import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './Component/Context/ThemeContext';
import { Auth0Provider } from '@auth0/auth0-react';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(

  // <React.StrictMode>
    <Auth0Provider
    domain={ window.location.hostname === 'localhost' ? "dev-7raa57s8hv2gj1hs.us.auth0.com":"dev-7raa57s8hv2gj1hs.us.auth0.com"}
    clientId={ window.location.hostname === 'localhost' ? "YPJHf5MwSZG9P1XbLz3OYH9KWlXqPf5D":"ABuLWWn3sHoTeHuzp7MDO0DPMjSjQx2t"}
    redirectUri={ window.location.origin}
    >
      <ThemeProvider>
      <App />
    </ThemeProvider>
    </Auth0Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
