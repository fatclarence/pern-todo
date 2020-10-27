import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditTodo from "./EditTodo";

const ListTodos = ({ todos: todos, getTodos: getTodos, setTodos=setTodos }) => {
    // State and what you are using to change the state
    // const[todos, setTodos] = useState([todos]);

    // Delete function
    const deleteTodo = async(id, description) => {
        try {
            const deleteTodo = await fetch(`/api/todos/${id}`, {
                 method: "DELETE"
            });
            setTodos(todos.filter(todo => 
                todo.todo_id !== id
            ));
            toast.warning("Deleted todo \"" + description + "\"");

        } catch(err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        // every refresh render, execute these functions
        getTodos();
    }, [todos]);
    
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
                            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id, todo.description)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default ListTodos;