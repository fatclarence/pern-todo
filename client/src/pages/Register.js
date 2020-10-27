import React, { useState, useContext, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { UserContext } from "../utils/UserProvider";
import ROUTES from "../routes/Routes";

const Register = () => {
    const { setUsername : setContextUsername, 
            setToken } = useContext(UserContext);

    // Initialise input states of form
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const {
        username,
        email,
        password,
        confirmPassword
    } = inputs;

    // When fields change, apply changes to input variables
    const handleChange = event => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const body = {
            username,
            email,
            password,
            confirmPassword
        };

        axios.post("/api/auth/register", body)
            .then(response => {
                const { data } = response;

                setContextUsername(data.username);
                setToken(data.token);
                toast.success("Thanks for joining us " + data.username + "!");
            })
            .catch(error => {
                toast.error(error.response.data.error);
            });

        console.log(`Form submitted by ${username}, with ${email}`);
    };

    return (
        //isAuthenticated ? <Redirect to={ROUTES.TODOLIST} />
         <div>
            <Container className="my-5">
                <h2>Register</h2>
                <Form className="mt-4 mb-3" onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="formPlainTextName">
                        <Form.Label className="text-right" column sm="2">
                            Username:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                type="text"
                                placeholder="Username"
                                value={username}
                                name="username"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlainEmail">
                        <Form.Label className="text-right" column sm="2">
                            Email:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                type="email"
                                placeholder="email@example.com"
                                value={email}
                                name="email"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlainPassword">
                        <Form.Label className="text-right" column sm="2">
                            Password:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                type="password"
                                placeholder="Password"
                                value={password}
                                name="password"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlainPassword">
                        <Form.Label className="text-right" column sm="2">
                            Confirm Password:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                name="confirmPassword"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>

                    <Button className="btn btn-primary" type="submit">
                        Register
                    </Button>
                </Form>
                <p>
                    Already have an account? Sign in&nbsp;
                    <Link to={ROUTES.LOGIN}>
                        here
                    </Link>
                </p>
            </Container>
        </div>
    );
};

export default Register;
