import React from 'react'
import {
  IconButton,
  TableCell,
  TableRow,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from '../_actions/user.actions';

function Student(props) {
  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const user = useSelector((state) => state.userdetails);

  const { student } = props;

    const updateStudent = () => {

    }

    const deleteStudent = () => {
      const studentUrl = `${baseUrl}/student/${student._id}`;

      const token = user.token;
		  const config = {
			  headers: { Authorization: `Bearer ${token}` },
		  };

      axios.delete(studentUrl, config).then((data) => {
        const response = data.data.data;
        dispatch(userActions.studentsData(response));
      });
    };

  return (
    <TableRow
      key={student.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {student.name}
      </TableCell>
      <TableCell component="th" scope="row">
        <IconButton onClick={updateStudent}>
          <CreateIcon />
        </IconButton>
        <IconButton onClick={deleteStudent}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default Student
