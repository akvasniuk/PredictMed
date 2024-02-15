import { combineReducers } from "redux";

import menu from "./menu";
import authReducer from "./authSlice";
import commentReducer from "./commentSlice";
import diseaseReducer from "./diseaseSlice";

const reducers = combineReducers({
  menu,
  auth: authReducer,
  comment: commentReducer,
  disease: diseaseReducer
});

export default reducers;
