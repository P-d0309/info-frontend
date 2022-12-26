import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../_actions/user.actions";
import { Formik, Form } from "formik";

const StoreStudentDialog = (props) => {
	const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const user = useSelector((state) => state.userdetails);

  const dispatch = useDispatch();

  const studentDataForm = useSelector((state) => state.studentDataForm);
  const students = useSelector((state) => state.students);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
  });

  const handleClose = () => {
    dispatch(
      userActions.studentDetailForm({
        isOpen: false,
        isEdit: false,
        student: {},
      })
    );
  };

  const handleSubmit = (values, { setFieldError, setSubmitting }) => {
     const token = user.token;
     const config = {
       headers: { Authorization: `Bearer ${token}` },
     };

    const data = {
      name: values.name,
    };
    let student;

    if (studentDataForm.isEdit) {
      student = `${baseUrl}/student/${studentDataForm.student._id}`;
    } else {
      student = `${baseUrl}/student`;
    }

    axios
      .post(student, data, config)
      .then((res) => {
        const student = res.data.data;

        if (studentDataForm.isEdit) {
          const studentUpdateData = students.map((selectedStudent) => {
            if (selectedStudent._id === student._id) {
              selectedStudent.name = student.name;
            }
            return selectedStudent;
          });

          dispatch(userActions.studentsData(studentUpdateData));
        } else {
          // students.push(student);
          // dispatch(userActions.studentsData(students));
          props.callGetStudents();

        }

        handleClose();
      })
      .catch((error) => {
        setSubmitting(false);
        const errorData = error.response.data;
        Object.keys(errorData.messages).map((key) =>
          setFieldError(key, errorData.messages[key])
        );
      });
  };

  return (
    <Dialog
      open={studentDataForm.isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth={"lg"}
    >
      <DialogTitle>Student</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ name: studentDataForm.student.name }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container gap={2} p={1} m={2}>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    id="name"
                    label="Name"
                    variant="outlined"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <Typography color={"red"}>
                    {errors.name && touched.name && errors.name}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant={"contained"}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default StoreStudentDialog;
