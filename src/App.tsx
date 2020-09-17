import React, { useEffect } from "react";
import "./App.sass";
import { connect } from "react-redux";
import { getProfile } from "./redux/actions/actions";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Dashboard from "./components/dashboard/dashboard";

type AppTypes = {
    getProfile: Function;
};

const App = (props: AppTypes) => {
    useEffect(() => {
        props.getProfile();
        // eslint-disable-next-line
    }, []);

    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <Route render={() => <Redirect to={{ pathname: "/" }} />} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default connect(null, { getProfile })(App);
