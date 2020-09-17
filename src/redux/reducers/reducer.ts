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
} from "../actions/types";

const initialState = {
    user: {},
    authenticated: false,
    loading: false,
    error: null,
    todos: [],
};

type ReducerTypes = {
    type: any;
    payload: any;
};

export default function (state = initialState, action: ReducerTypes) {
    switch (action.type) {
        case NO_PROFILE:
            return initialState;
        case GET_PROFILE:
            return {
                ...state,
                user: action.payload,
                authenticated: true,
            };
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                authenticated: true,
            };
        case SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                authenticated: true,
            };
        case LOGOUT:
            return initialState;
        case GET_TODOS:
            return {
                ...state,
                todos: action.payload,
            };
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map((todo: any) => {
                    if (todo.id === action.payload.id) {
                        return action.payload;
                    }
                    return todo;
                }),
            };
        case UPDATE_TODO_COLOR:
            return {
                ...state,
                todos: state.todos.map((todo: any) => {
                    if (todo.id === action.payload.id) {
                        return action.payload;
                    }
                    return todo;
                }),
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: action.payload,
            };
        case ADD_TODO:
            return {
                ...state,
                todos: [action.payload, ...state.todos],
            };
        default:
            return state;
    }
}
