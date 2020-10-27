import React, { useState, useEffect, useContext } from "react";
import ROUTES from "./Routes";
import { Route, Redirect, Switch } from "react-router-dom";

import { UserContext } from "../utils/UserProvider";
import Todos from "../pages/Todos";

const PrivateRoute = (props) => {
    const { username, token } = useContext(UserContext);

    // const [auth, setAuth] = useState(null);

    // useEffect(() => {
    //     if(username && token) {
    //         setAuth({ username, token });
    //         // console.log(auth);
    //     }
    // }, [username, token]);

    const isAuthenticated = () => username != null && token != null;

    return (
        <Route {...props} render={props => 
            isAuthenticated() ? (
                                <Switch>
                                    <Route exact path={ROUTES.TODOLIST}><Todos /></Route>
                                </Switch>)
                            : (<Redirect to={ROUTES.LOGIN} />)
        } />
    );
}

export default PrivateRoute;