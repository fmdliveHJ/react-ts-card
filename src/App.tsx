import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from '@/pages/Home';
import Card from '@/pages/Card';
import MainLayout from '@/layouts/MainLayout';
import Join from '@/pages/Join';
import Login from '@/pages/Login';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/card/:id',
          element: <Card />,
        },
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/join',
          element: <Join />,
        },
        {
          path: '/login',
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
