import { combineReducers } from "redux";
import signupReducer from "./signup";
import loginReducer from "./login";
import testReducer from "./test";
import siteReducer from "./site";


export default combineReducers({
    signup: signupReducer,
    login: loginReducer,
    test: testReducer,
    site: siteReducer
})