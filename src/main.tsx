import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { RaffleProvider } from './context/RaffleContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RaffleProvider>
      <App />
    </RaffleProvider>
  </StrictMode>
);