import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from '@/pages/Home';
import Card from '@/pages/Card';
import MainLayout from '@/layouts/MainLayout';
import Join from '@/pages/Join';
import Login from '@/pages/Login';
import PrivateRoute from '@/components/auth/PrivateRoute';
import Apply from '@/pages/Apply';
import Finish from '@/pages/Finish';

import MyPage from '@/pages/MyPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
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
        {
          path: '/card/:id',
          element: <Card />,
        },
        {
          path: '/apply/:id',
          element: (
            <PrivateRoute>
              <Apply />
            </PrivateRoute>
          ),
        },
        {
          path: '/apply/finish',
          element: (
            <PrivateRoute>
              <Finish />
            </PrivateRoute>
          ),
        },
        {
          path: '/myPage',
          element: (
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
