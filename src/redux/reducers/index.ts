import { combineReducers } from "redux";
import reducer from "./reducer";

export default combineReducers({
    reducer,
});

export type RootState = ReturnType<typeof reducer>;
