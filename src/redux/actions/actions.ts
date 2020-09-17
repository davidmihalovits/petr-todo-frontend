import {
    NO_PROFILE,
    GET_PROFILE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT,
    GET_TODOS,
    UPDATE_TODO,
    UPDATE_TODO_COLOR,
    DELETE_TODO,
    ADD_TODO,
} from "./types";
import axios from "axios";

export const getProfile = () => (dispatch: Function) => {
    const token = localStorage.getItem("token");

    if (!token) {
        dispatch({
            type: NO_PROFILE,
        });
    }

    if (token) {
        axios
            .get("https://petr-todo-server.herokuapp.com/profile", {
                headers: { token: token },
            })
            .then((res) =>
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data,
                })
            );
    }
};

export const login = (login: string) => (dispatch: Function) => {
    dispatch({
        type: LOGIN_REQUEST,
    });

    axios
        .post("https://petr-todo-server.herokuapp.com/login", login)
        .then((res) => {
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);

                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data.user,
                });
            } else if (res.data.status === "Invalid credentials.") {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: res.data.status,
                });
            }
        });
};

export const signup = (signup: string) => (dispatch: Function) => {
    dispatch({
        type: SIGNUP_REQUEST,
    });

    axios
        .post("https://petr-todo-server.herokuapp.com/signup", signup)
        .then((res) => {
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);

                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: res.data.user,
                });
            } else if (
                res.data.status === "Enter your username, max 10 characters."
            ) {
                dispatch({
                    type: SIGNUP_FAIL,
                    payload: res.data.status,
                });
            } else if (
                res.data.status === "Password must be at least 6 characters."
            ) {
                dispatch({
                    type: SIGNUP_FAIL,
                    payload: res.data.status,
                });
            } else if (res.data.status === "This username is already taken.") {
                dispatch({
                    type: SIGNUP_FAIL,
                    payload: res.data.status,
                });
            }
        });
};

export const logout = () => (dispatch: Function) => {
    dispatch({
        type: LOGOUT,
    });
    localStorage.removeItem("token");
    window.location.reload();
};

export const getTodos = () => (dispatch: Function) => {
    const token = localStorage.getItem("token");

    if (token) {
        axios
            .get("https://petr-todo-server.herokuapp.com/getTodos", {
                headers: { token: token },
            })
            .then((res) =>
                dispatch({
                    type: GET_TODOS,
                    payload: res.data,
                })
            );
    }
};

export const updateTodo = (updateTodo: any) => (dispatch: any) => {
    const token = localStorage.getItem("token");

    if (token) {
        axios
            .put(
                `https://petr-todo-server.herokuapp.com/updateTodo/${updateTodo.id}`,
                updateTodo,
                {
                    headers: { token: token },
                }
            )
            .then((res) => {
                dispatch({
                    type: UPDATE_TODO,
                    payload: res.data,
                });
            });
    }
};

export const updateColor = (updateColor: any) => (dispatch: any) => {
    const token = localStorage.getItem("token");

    if (token) {
        axios
            .put(
                `https://petr-todo-server.herokuapp.com/updateColor/${updateColor.id}`,
                updateColor,
                {
                    headers: { token: token },
                }
            )
            .then((res) => {
                dispatch({
                    type: UPDATE_TODO_COLOR,
                    payload: res.data,
                });
            });
    }
};

export const deleteTodo = (deleteTodo: any) => (dispatch: any) => {
    const token = localStorage.getItem("token");

    if (token) {
        axios
            .delete(
                `https://petr-todo-server.herokuapp.com/deleteTodo/${deleteTodo.id}`,
                {
                    headers: { token: token },
                }
            )
            .then((res) => {
                dispatch({
                    type: DELETE_TODO,
                    payload: res.data,
                });
            });
    }
};

export const addTodo = (addNewTodo: any) => (dispatch: any) => {
    const token = localStorage.getItem("token");

    if (token) {
        axios
            .post(
                `https://petr-todo-server.herokuapp.com/addTodo`,
                addNewTodo,
                {
                    headers: { token: token },
                }
            )
            .then((res) => {
                dispatch({
                    type: ADD_TODO,
                    payload: res.data,
                });
            });
    }
};
