import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './styles/GlobalStyles.css';
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

// Rendering the React application inside the 'root' element of the HTML document
ReactDOM.render(
  <React.StrictMode>
    {/* Providing the Redux store to the entire application */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') // Mounting the app inside the HTML element with id 'root'
);
