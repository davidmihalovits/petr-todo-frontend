import React, { useState, useEffect } from "react";
import "./login.sass";
import { Link, useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { login } from "../../redux/actions/actions";
import { RootState } from "../../redux/reducers";

type LoginTypes = {
    reducer: RootState;
    login: Function;
};

const Login: React.FunctionComponent<LoginTypes> = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const reducer = useSelector((state: LoginTypes) => state.reducer);

    useEffect(() => {
        if (reducer.authenticated) {
            history.push("/dashboard");
        }
    });

    const login = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        props.login({
            username: username,
            password: password,
        });
    };

    return (
        <div className="login">
            <h1 className="login-title">Login</h1>
            <form className="login-form" onSubmit={login} noValidate>
                <label className="login-label" htmlFor="username">
                    Username
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                />
                <label className="login-label" htmlFor="password">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button className="login-button" type="submit">
                    {reducer.loading ? "Loading..." : "Login"}
                </button>
            </form>
            <p className="not-a-user">
                Not a user yet?{" "}
                <Link className="signup-link" to="/signup">
                    Signup
                </Link>
                .
            </p>
            {reducer.error && (
                <div className="login-error">{reducer.error}</div>
            )}
        </div>
    );
};

export default connect(null, { login })(Login);
