import React, { useState, useEffect } from "react";
import "./signup.sass";
import { Link, useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { signup } from "../../redux/actions/actions";
import { RootState } from "../../redux/reducers";

type SignupTypes = {
    reducer: RootState;
    signup: Function;
};

const Signup: React.FunctionComponent<SignupTypes> = (props: SignupTypes) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const reducer = useSelector((state: SignupTypes) => state.reducer);

    useEffect(() => {
        if (reducer.authenticated) {
            history.push("/dashboard");
        }
    });

    const signup = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        props.signup({
            username: username,
            password: password,
        });
    };

    return (
        <div className="signup">
            <h1 className="signup-title">Signup</h1>
            <form className="signup-form" onSubmit={signup} noValidate>
                <label className="signup-label" htmlFor="username">
                    Username
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.trim())}
                    className="signup-input"
                />
                <label className="signup-label" htmlFor="password">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    className="signup-input"
                />
                <button className="signup-button" type="submit">
                    {reducer.loading ? "Loading..." : "Signup"}
                </button>
            </form>
            <p className="already-a-user">
                Already a user?{" "}
                <Link className="login-link" to="/login">
                    Login
                </Link>
                .
            </p>
            {reducer.error && (
                <div className="signup-error">{reducer.error}</div>
            )}
        </div>
    );
};

export default connect(null, { signup })(Signup);
