import { combineReducers } from "redux";
import loginReducer from "./auth/login/reducer";
import registerReducer from "./auth/register/reducer";
import roleReducer from "./role/reducer";
import permissionReducer from "./permission/reducer";

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    role: roleReducer,
    permission: permissionReducer
})

export default rootReducer;