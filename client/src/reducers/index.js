import { combineReducers } from "redux";
import signupReducer from "./signup";
import loginReducer from "./login";
import testReducer from "./test";


export default combineReducers({
    signup : signupReducer,
    login : loginReducer,
    test : testReducer
})