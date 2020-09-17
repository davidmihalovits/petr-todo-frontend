import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducers";

type PrivateRouteTypes = {
    reducer: RootState;
};

export const PrivateRoute = ({ component: Component }: any) => {
    const reducer = useSelector((state: PrivateRouteTypes) => state.reducer);

    const location = useLocation();

    return (
        <Route
            render={() =>
                localStorage.getItem("token") && reducer.authenticated ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
