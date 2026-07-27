import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
          <Toaster
            position="top-right"
            containerStyle={{ zIndex: 999999 }}
            toastOptions={{
              duration: 3000,
              style: {
                background: 'hsl(230, 20%, 14%)',
                color: 'hsl(0, 0%, 95%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontFamily: 'Inter, sans-serif',
              },
              success: {
                iconTheme: {
                  primary: 'hsl(160, 80%, 50%)',
                  secondary: 'hsl(230, 20%, 14%)',
                },
              },
              error: {
                iconTheme: {
                  primary: 'hsl(0, 80%, 60%)',
                  secondary: 'hsl(230, 20%, 14%)',
                },
              },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
