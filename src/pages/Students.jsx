import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StoreStudentDialog from "../components/StoreStudentDialog";
import Student from "../components/Student";
import { userActions } from "../_actions/user.actions"

function Students() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [isdataLoaded, setIsdataLoaded] = useState(false);
  
  const baseUrl = import.meta.env.VITE_BASE_API_URL;

  const studentsUrl = `${baseUrl}/students`;

  const storedStudents = useSelector((state) => state.students);

  const setStudentsData = (studentsData) => {
    setStudents(studentsData);
    setIsdataLoaded(true);
  };

  useEffect(() => {
    console.log("🚀 ~ file: Students.jsx:45 ~ Students ~ storedStudents", storedStudents)
    if (storedStudents.length === 0) {
      getStudent();
    } else {
      setStudentsData(storedStudents);
    }
  }, [storedStudents]);

  const getStudent = () => {
    axios.get(studentsUrl).then((data) => {
      const response = data.data.data;
      dispatch(userActions.studentsData(response));
      setStudentsData(response);
    });
  };

  const addStudent = () => {
    dispatch(
      userActions.studentDetailForm({
        isOpen: true,
        isEdit: false,
        student: {},
      })
    );
  }
  return (
    <>
      <Card>
        <CardHeader title="Students"></CardHeader>
        <CardContent>
          <Grid container>
            <Grid item sm={12}>
              <Button onClick={addStudent} variant={"contained"}>
                Add Student
              </Button>
            </Grid>
            <Grid item sm={12}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((row) => (
                      <Student
                        student={row}
                        key={row._id}
                        callGetStudents={getStudent}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <StoreStudentDialog callGetStudents={getStudent} />
    </>
  );
}

export default Students;
