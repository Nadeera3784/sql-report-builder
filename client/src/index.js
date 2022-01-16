import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import App from './components/App';
import AppProvider from './store/AppContext';

ReactDOM.render(
  <AppProvider>
    <App/>
  </AppProvider>,
  document.getElementById('root')
);
