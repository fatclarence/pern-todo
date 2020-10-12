import React, { Fragment, useState } from "react";

// Must DESTRUCTURE the prop
// For each todo, return a unique edit button
// that reveals a modal when clicked
const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);

    // Edit description function
    const updateDescription = async(e) => {
        // Prevent reload of browser before function call on click
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch(err) {
            console.error(err.message);
        }
    }
    return (
        <Fragment>
            <button type="button" className="btn btn-warning" 
            data-toggle="modal" 
            data-target={`#id${todo.todo_id}`}>
                Edit
            </button>
            {/* Put onClick within the div with className modal for any additional functionality
            you want to have when you click outside the modal*/}
            <div className="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
            <div className="modal-dialog">
            <div className="modal-content">

            <div className="modal-header">
                <h4 className="modal-title">Edit Todo</h4>
                <button type="button" 
                    className="close" 
                    data-dismiss="modal"
                    onClick={() => setDescription(todo.description)}    >
                    &times;
                </button>
            </div>

            <div className="modal-body">
                <input type="text" 
                    className="form-control" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}>
                </input>
            </div>

            <div className="modal-footer">
                <button type="button" 
                    className="btn btn-warning" 
                    data-dismiss="modal"
                    onClick={e => updateDescription(e)}>
                    Edit
                </button>
                <button type="button" className="btn btn-danger" 
                data-dismiss="modal" 
                onClick={() => setDescription(todo.description)}>
                    Close
                </button>
            </div>

            </div>
            </div>
            </div>
        </Fragment>
    );
};

export default EditTodo;
