// src/main.jsx — punto de entrada de la aplicación
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import App from './App';

// Reset de estilos global mínimo
const style = document.createElement('style');
style.textContent = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AuthProvider envuelve toda la app para que el contexto de auth sea accesible globalmente */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
