import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Global } from '@emotion/react';
import globalStyles from './styles/globalStyles.ts';

createRoot(document.getElementById('root')!).render(
  <>
    <Global styles={globalStyles} />
    <App />
  </>
);
