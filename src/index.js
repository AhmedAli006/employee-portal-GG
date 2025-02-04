import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid styles
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme styles
import { Auth0Provider } from '@auth0/auth0-react';
import config from "./auth_config.json";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Auth0Provider
 domain={config.domain}
 clientId={config.clientId}
 authorizationParams={{
   redirect_uri: window.location.origin,
   audience: config.audience,
 }}
  >

    <App />
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
