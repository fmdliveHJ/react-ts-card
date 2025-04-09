import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Global } from '@emotion/react';
import globalStyles from '@/styles/globalStyles.ts';
import { AlertContextProvider } from '@/context/AlertContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <>
    <Global styles={globalStyles} />
    <QueryClientProvider client={queryClient}>
      <AlertContextProvider>
        <App />
      </AlertContextProvider>
    </QueryClientProvider>
  </>
);
