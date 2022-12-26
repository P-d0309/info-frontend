import { combineReducers } from "redux";

import {
  userdetails,
  students,
  studentDataForm,
} from "./user.reducer";


const allReducers = combineReducers({
  userdetails,
  students,
  studentDataForm,
});

const rootReducer = (state, action) => {
	if (action.type === "USER_LOGOUT") {
		state = undefined;
	}

	return allReducers(state, action);
};

export default rootReducer;
