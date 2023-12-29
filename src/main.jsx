import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { Static } from "./Static"
import './index.css'
import { BrowserRouter as Router,} from 'react-router-dom';
import { LoginContextProvider } from './App/context/loginContext';

const Root = () => {
    return (
        <Router>
            <Static/>
            <LoginContextProvider>
                <App/>
            </LoginContextProvider>
        </Router>
    )
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
