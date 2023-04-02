import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import { EmpContextProvider } from './context/EmpContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EmpContextProvider>
        <App />
      </EmpContextProvider>
    </AuthContextProvider>
    
  </React.StrictMode>
);