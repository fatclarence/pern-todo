import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";

const InputTodo = () => {
    const [description, setDescription] = useState("");
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            // client input texts
            const body = { description };
            
            const response = await fetch("/api/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            toast.success("Successfully added to your todo list!");
            
        } catch(err) {
            console.error(err.message);
            toast.error("There seems to be a problem here, do let Clarence know:)");
        }
    };

    // onChange here allows changing of input inside textbox
    return (
    <Fragment>
        <h1 className="text-center mt-5">Input Todo</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <input 
            type="text" 
            className="form-control" 
            value={description}
            onChange={e => setDescription(e.target.value)}
            />
            <button className="btn btn-success">Add</button>
        </form>
    </Fragment> 
    );
};

export default InputTodo;