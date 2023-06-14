import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SettingsProvider from './Context/Settings';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-1vvf7qh0jrb05mmw.us.auth0.com"
    clientId="sK9caLEeTpHoYb4Dthy2zHVURceacjBf"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <SettingsProvider>
      <App />
    </SettingsProvider>

  </Auth0Provider>
);


