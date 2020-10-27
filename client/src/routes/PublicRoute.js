import React, { useState, useEffect, useContext } from "react";
import ROUTES from "./Routes";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "../utils/UserProvider";

export const PublicRoute = ({ path, component: Component, ...rest }) => {
    const { username, token } = useContext(UserContext);

    // const [auth, setAuth] = useState(null);

    // useEffect(() => {
    //     if(username && token) {
    //         // setAuth({ username: username, token: token }); 
    //     }
    // }, [username, token]);

    const isAuthenticated = () => username != null && token != null;

    return (
        <Route {...rest} path = {path}
            render = {props => !isAuthenticated() ? (<Component {...props} />)
                                                 : (<Redirect to={ROUTES.TODOLIST} />)}
        />
    )
}

export default PublicRoute;