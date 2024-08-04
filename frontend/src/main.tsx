import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext';
import { LoginModalProvider } from './contexts/LoginModalContext';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <LoginModalProvider>
          <App />
        </LoginModalProvider>
      </AuthProvider>
    </React.StrictMode>,
  );
} else {
  console.error('Root element not found');
}
