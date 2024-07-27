import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-r4v8ocmv67ezl0pa.us.auth0.com"// change the key if needed
    clientId="Un48c7na5AChLOiixVgGElwuTwVoAI1P"
    redirectUri={`${window.location.origin}/dashboard`}
    onRedirectCallback={onRedirectCallback}
    cacheLocation="localstorage"
  >
    <App />
  </Auth0Provider>,
)
