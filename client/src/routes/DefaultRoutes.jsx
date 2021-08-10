import {Redirect, Route, Switch} from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import AuthPage from "../pages/Authentication/AuthPage";
import RegPage from "../pages/Authentication/RegPage";
import ForgotPage from "../pages/Authentication/ForgotPage";
import React from "react";

const DefaultRoutes = () => (
    <div className='container'>
    <Switch>
        <Route path={"/"} exact>
            <LandingPage isAuthenticated={false}/>
        </Route>
        <Route path={"/auth"}>
            <AuthPage/>
        </Route>
        <Route path={"/reg"}>
            <RegPage/>
        </Route>
        <Route path={"/forgot"}>
            <ForgotPage/>
        </Route>
        <Redirect to={"/"}/>
    </Switch>
    </div>
)

export default DefaultRoutes
