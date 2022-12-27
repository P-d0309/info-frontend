import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import { userActions } from "../_actions/user.actions";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.userdetails);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(userActions.login(JSON.parse(user)));
    } else {
      return navigate('/login');
    }
  }, []);
  return children;
};

export default PrivateRoute;
