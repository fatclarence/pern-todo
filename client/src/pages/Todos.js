import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import InputTodo from "../components/InputTodo";
import ListTodos from "../components/ListTodos";


const Todos = ({ logout: logout }) => {
    // State and what you are using to change the state
    const[todos, setTodos] = useState([]);

    const getTodos = async() => {
        try {
            // grab data from server, fetch is a get request
            const response = await fetch("/api/todos");
            // Have to parse because receiving json data
            const jsonData = await response.json();
            // Set the state of todos on the client side to whatever was fetched during the first render
            setTodos(jsonData);
        } catch(err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        // every refresh render, execute these functions
        getTodos();
    }, []);

    return (<div className="container">
                <InputTodo />
                <ListTodos todos={todos} getTodos={getTodos} setTodos={setTodos} />
                <Button className="btn btn-danger mr-auto" onClick={logout}>
                    Logout
                </Button>
            </div>);

};

export default Todos;