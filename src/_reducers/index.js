import { combineReducers } from "redux";

import { userdetails, students, subjects } from "./user.reducer";


const allReducers = combineReducers({
  userdetails,
  students,
  subjects,
});

const rootReducer = (state, action) => {
	if (action.type === "USER_LOGOUT") {
		state = undefined;
	}

	return allReducers(state, action);
};

export default rootReducer;
