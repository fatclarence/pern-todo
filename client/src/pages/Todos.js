import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import InputTodo from "../components/InputTodo";
import ListTodos from "../components/ListTodos";


const Todos = () => {
    return (<div className="container">
                <InputTodo />
                <ListTodos />
            </div>);

};

export default Todos;