import React from "react";
import "./navbar.sass";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { logout } from "../../redux/actions/actions";
import logoutIcon from "../../assets/logoutIcon.svg";
import note from "../../assets/note.svg"
import { RootState } from "../../redux/reducers";

type NavbarTypes = {
    reducer: RootState;
    logout: Function;
};

const Navbar = (props: NavbarTypes) => {
    const reducer = useSelector((state: NavbarTypes) => state.reducer);

    if (!reducer.authenticated) {
        return (
            <div className="navbar-auth-false">
                <div className="navbar-inner">
                    <img src={note} alt="note" className="navbar-note" />
                    <Link className="navbar-login-button-link" to="/login">
                        <button className="navbar-login-button">Login</button>
                    </Link>
                </div>
            </div>
        );
    }

    if (reducer.authenticated) {
        return (
            <div className="navbar-auth-true">
                <div className="navbar-inner">
                    <img src={note} alt="note" className="navbar-note" />
                    <p className="navbar-hello">
                        Hello {reducer.user.username}!
                    </p>
                    <img
                        className="logout-icon"
                        src={logoutIcon}
                        alt="logout"
                        onClick={() => props.logout()}
                    />
                </div>
            </div>
        );
    }
};

export default connect(null, { logout })(Navbar as React.FunctionComponent);
