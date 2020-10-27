import React from "react";
import InputTodo from "../components/InputTodo";
import ListTodos from "../components/ListTodos";


const Todos = () => {
    return (<div className="container">
                <InputTodo />
                <ListTodos />
            </div>);

};

export default Todos;