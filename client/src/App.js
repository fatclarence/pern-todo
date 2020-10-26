import React, { Fragment } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import UserProvider from './utils/UserProvider';

function App() {
  return (
  <Fragment>
    <UserProvider>
      <ToastContainer />
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </UserProvider>
  </Fragment>
  );
}

export default App;
