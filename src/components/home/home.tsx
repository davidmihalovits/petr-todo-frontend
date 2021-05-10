import React, { useEffect } from "react";
import "./home.sass";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../redux/reducers";

type HomeTypes = {
    reducer: RootState;
};

const Home = () => {
    const reducer = useSelector((state: HomeTypes) => state.reducer);

    const history = useHistory();

    useEffect(() => {
        if (reducer.authenticated) {
            history.push("/dashboard");
        }
    });

    return (
        <div className="home">
            <h1 className="home-title">Welcome</h1>
            <p className="home-description">
                This a simple PETR-stack todo app.
            </p>
            <p className="home-description">
                P stands for PostgreSQL, E for Express, T for TypeScript and R
                for React. I implemented server-side authentication, basic CRUD
                functionalities, global state management with Redux and so on.
            </p>
            <p className="home-description">
                Please log in to use this app. Everything is saved in the cloud
                so your notes are synchronized across devices.
            </p>
            <p className="home-paragraph">
                Frontend code:{" "}
                <a
                    href="https://github.com/davidmihalovits/petr-todo-frontend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-link"
                >
                    https://github.com/davidmihalovits/petr-todo-frontend
                </a>
            </p>
            <p className="home-paragraph">
                Backend code:{" "}
                <a
                    href="https://github.com/davidmihalovits/petr-todo-backend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-link"
                >
                    https://github.com/davidmihalovits/petr-todo-backend
                </a>
            </p>
        </div>
    );
};

export default Home;
