import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { Home } from './pages/home';
import './index.css';

const myUser =   {
  "username": "@me",
  "id": "me13579"
};

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home myUser={myUser} />
  },
  {
    path: '/profile/:user_id',
    element: <Home myUser={myUser} profile />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
