import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import App from './app/views/App';
import registerServiceWorker from './../src/registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
