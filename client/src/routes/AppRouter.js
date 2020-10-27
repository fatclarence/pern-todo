import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ROUTES from "./Routes";

import Register from "../pages/Register";
import Login from "../pages/Login";
// import Todos from "../pages/Todos";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
    return (
        <Fragment>
            <ToastContainer />
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={props => <Redirect to={ROUTES.LOGIN} />} />
                    <PublicRoute path={ROUTES.REGISTER} exact={true} component={Register} />
                    <PublicRoute path={ROUTES.LOGIN} exact={true} component={Login} />
                    <PrivateRoute path={ROUTES.TODOLIST} />
                </Switch>
            </BrowserRouter>
        </Fragment>
    )
}

export default AppRouter;