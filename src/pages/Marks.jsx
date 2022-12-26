import { Card, CardContent, CardHeader } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions/user.actions';

function Marks() {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const studentsUrl = `${baseUrl}/students`;
  const subjectUrl = `${baseUrl}/subjects`;

  const dispatch = useDispatch();
  const storedStudents = useSelector((state) => state.students);
  
  const subjects = useSelector((state) => state.subjects);

  useEffect(() => {
    if(storedStudents.length === 0) {
      getSubjects();
    }

    if (subjects.length === 0) {
      getStudents();
    }
  }, []);
  const getSubjects = () => {
    axios.get(subjectUrl).then((res) => {
      res = res.data.data;
      
      dispatch(userActions.subjectsData(res));
    });
  }
  const getStudents = () => {
    axios.get(studentsUrl).then((res) => {
      res = res.data.data;
      dispatch(userActions.studentsData(res));
    });
  };
  return (
    <Card>
      <CardHeader title="Enter subject wise marks"></CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

export default Marks
