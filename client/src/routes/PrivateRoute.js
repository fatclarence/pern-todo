import React, { useContext } from "react";
import ROUTES from "./Routes";
import { Route, Redirect, Switch, useHistory} from "react-router-dom";

import { UserContext } from "../utils/UserProvider";
import Todos from "../pages/Todos";
import { toast } from "react-toastify";

const PrivateRoute = (props) => {
    const history = useHistory();

    const { setUsername,
            setToken,
            username, 
            token } = useContext(UserContext);

    const logout = () => {
        setUsername(null);
        setToken(null);

        history.push(ROUTES.LOGIN);

        toast.error("You have logged out!");
    };

    const isAuthenticated = () => username != null && token != null;

    return (
        <Route {...props} render={props => 
            isAuthenticated() ? (
                                <Switch>
                                    <Route exact path={ROUTES.TODOLIST}>
                                        <Todos logout={logout} />
                                    </Route>
                                </Switch>)
                            : (<Redirect to={ROUTES.LOGIN} />)
        } />
    );
}

export default PrivateRoute;