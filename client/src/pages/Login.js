import React, { useState, useContext, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { UserContext } from "../utils/UserProvider";
import ROUTES from "../routes/Routes";

const Login = () => {
    // setContextUsername will change the state in the context (received from parent/ancestor component)
    const { setUsername : setContextUsername,
            setToken } = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async event => {
        event.preventDefault();
        const body = { username, password };
        axios.post("/api/auth/login", body)
            .then(response => {
                const { data } = response;
                console.log(data.token);
                console.log(data.username);
                setToken(data.token);
                setContextUsername(data.username);
                toast.success("Welcome Back " + data.username);
            })
            .catch(error => {
                toast.error(error.response.data.error);
            });

        console.log(`Sign in form submitted by ${username}`);
    };

    return (<div>
            <Container className="my-5">
                <h2>Login</h2>
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
                                onChange={e => setUsername(e.target.value)}
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
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Col>
                    </Form.Group> 

                    <Button className="btn btn-success" type="submit">
                        Sign In
                    </Button>
                </Form>
                <p>
                    Don't have an account? Register&nbsp;
                    <Link to={ROUTES.REGISTER}>
                        NOW!
                    </Link>
                </p>
            </Container>
        </div>
    )
}

export default Login;