
import { RouterProvider } from 'react-router-dom';
import router from './router';

import './App.css'
import React from 'react';
import { UserProvider } from './context/UserContext';

function App() {

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App
