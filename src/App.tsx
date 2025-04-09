import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from '@/pages/Home';
import Card from '@/pages/Card';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/card/:id',
      element: <Card />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
