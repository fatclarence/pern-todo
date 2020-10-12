import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
    // State and what you are using to change the state
    const[todos, setTodos] = useState([]);

    // Delete function
    const deleteTodo = async(id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                 method: "DELETE"
            });
            setTodos(todos.filter(todo => 
                todo.todo_id !== id
            ));
            console.log(todos);
        } catch(err) {
            console.error(err.message);
        }
    }

    const getTodos = async() => {
        try {
            // grab data from server, fetch is a get request
            const response = await fetch("http://localhost:5000/todos");
            // Have to parse because receiving json data
            const jsonData = await response.json();
            // Set the state of todos on the client side to whatever was fetched during the first render
            setTodos(jsonData);
            console.log("EXECUTED!!! GET");
        } catch(err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        // every refresh render, execute these functions
        getTodos();
    }, []);

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo} /></td>
                            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default ListTodos;