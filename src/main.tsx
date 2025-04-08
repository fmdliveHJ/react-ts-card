import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Global } from '@emotion/react';
import globalStyles from './styles/globalStyles.ts';
import { AlertContextProvider } from './context/AlertContext.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <Global styles={globalStyles} />
    <AlertContextProvider>
      <App />
    </AlertContextProvider>
  </>
);
