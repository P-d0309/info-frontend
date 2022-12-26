import { userConstants } from "../_constants/user.constants";

export const userActions = {
  login,
  logout,
  studentDetailForm,
  studentsData,
};

function login(user) {
	return { type: userConstants.USER_LOGIN, user };
}

function studentsData(students) {
  return { type: userConstants.STUDENTS, students };
}

function studentDetailForm(student) {
  return { type: userConstants.STUDENTS_FORM, student };
}

function logout() {
	localStorage.clear();
	return { type: userConstants.USER_LOGOUT };
};