import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import './index.css';
import App from './containers/AppContainer/App';
import reportWebVitals from './reportWebVitals';

const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <App history={history} />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
