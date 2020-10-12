import React, { Fragment, useEffect, useState } from "react";

const ListTodos = () => {
    // State and what you are using to change the state
    const[todos, setTodos] = useState([]);

    const getTodos = async() => {
        try {
            // grab data from server, fetch is a get request
            const response = await fetch("http://localhost:5000/todos");
            // Have to parse because receiving json data
            const jsonData = await response.json();
            setTodos(jsonData);
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
                        <tr>
                            <td>{todo.description}</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default ListTodos;