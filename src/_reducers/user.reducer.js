import { userConstants } from "../_constants/user.constants";


export const userdetails = (
	state = {  },
	action
) => {
	switch (action.type) {
		case userConstants.USER_LOGIN:
			return action.user;
		default:
			return state;
	}
};

export const students = (state = [], action) => {
	switch (action.type) {
    case userConstants.STUDENTS:
      return action.students;
    default:
      return state;
  }
};

export const studentDataForm = (
  state = {
    isOpen: false,
    isEdit: false,
    student: {},
  },
  action
) => {
  switch (action.type) {
    case userConstants.STUDENTS_FORM:
      return action.student;
    default:
      return state;
  }
};