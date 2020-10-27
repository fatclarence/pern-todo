import React, { Fragment } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import UserProvider from './utils/UserProvider';
import AppRouter from './routes/AppRouter';

function App() {
  return (
  <div>
    <UserProvider>
       <AppRouter />
    </UserProvider>
  </div>
  );
}

export default App;
