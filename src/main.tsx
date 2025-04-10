import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Global } from '@emotion/react';
import globalStyles from '@/styles/globalStyles.ts';
import { AlertContextProvider } from '@/context/AlertContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthGuard from '@/components/auth/AuthGuard';
import { RecoilRoot } from 'recoil';

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
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AlertContextProvider>
          <AuthGuard>
            <App />
          </AuthGuard>
        </AlertContextProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </>
);
