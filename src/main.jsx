import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import app from '../firebaseConfig.js';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
