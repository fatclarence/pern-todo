import React, { Fragment } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
  return (
  <Fragment>
    <ToastContainer />
    <div className="container">
      <InputTodo />
      <ListTodos />
    </div>
  </Fragment>
  );
}

export default App;
