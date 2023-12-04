import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { Static } from "./Static"
import './index.css'
import { BrowserRouter as Router,} from 'react-router-dom';

const Root = () => {
    return (
        <Router>
            <Static/>
            <App/>
        </Router>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
