import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import RentProvider from './Pages/RentContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <RentProvider>
    <App />
    </RentProvider>
 
);

