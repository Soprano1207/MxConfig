import { RouterProvider } from 'react-router-dom';
import router from './router';
import './App.css';
import React from 'react';
import { UserProvider } from './context/UserContext';
import axios from 'axios';
import userStore from './store/user-store';
import Loading from './components/Loading';
import configuratorStore from './store/configurator-store';

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          await userStore.authorization();
          await configuratorStore.fetchUserConfigurationAction();
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />; // Show loading indicator while fetching data
  }

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
