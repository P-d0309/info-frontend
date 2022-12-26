import {
  Button,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  Select,
  FormControl,
  Grid,
  InputLabel,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Formik, Form } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../_actions/user.actions";
import * as Yup from "yup";

function Marks() {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  const user = useSelector((state) => state.userdetails);

  const studentsUrl = `${baseUrl}/students`;

  const dispatch = useDispatch();

  const storedStudents = useSelector((state) => state.students);

  const validationSchema = Yup.object().shape({
    studentID: Yup.string().required("Student is Required"),
    english: Yup.number('must be a number').required("English marks are Required"),
    maths: Yup.number('must be a number').required("MAths marks are Required"),
    science: Yup.number('must be a number').required("Science marks are Required"),
    gujarati: Yup.number('must be a number').required("Gujarati  marks are Required"),
  });

  const submitForm = (values, { setFieldError, setSubmitting }) => {
     const token = user.token;
     const config = {
       headers: { Authorization: `Bearer ${token}` },
     };
     const marksUrl = `${baseUrl}/set-marks`;

      axios
        .post(marksUrl, values, config)
        .then((res) => {
          setSubmitting(false);
          const student = res.data.data;
        })
        .catch((error) => {
          setSubmitting(false);
          const errorData = error.response.data;
          Object.keys(errorData.messages).map((key) =>
            setFieldError(key, errorData.messages[key])
          );
        });
  };
  useEffect(() => {

    if (storedStudents.length === 0) {
      getStudents();
    }
  }, []);
  
  const getStudents = () => {
    axios.get(studentsUrl).then((res) => {
      res = res.data.data;
      dispatch(userActions.studentsData(res));
    });
  };
  return (
    <Card>
      <CardHeader title="Enter subject wise marks"></CardHeader>
      <CardContent>
        <Formik
          initialValues={{
            studentID: "",
            english: 0,
            maths: 0,
            science: 0,
            gujarati: 0,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => submitForm(values, actions)}
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
              <Grid container gap={2} m={2}>
                <Grid item sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select a student
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.studentID}
                      name="studentID"
                      label="Select a student"
                      onChange={handleChange}
                    >
                      {storedStudents.map((student) => {
                        return (
                          <MenuItem value={student._id} key={student._id}>
                            {student.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Typography color={"red"}>
                      {errors.studentID &&
                        touched.studentID &&
                        errors.studentID}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    name="maths"
                    value={values.maths}
                    label={"Maths"}
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <Typography color={"red"}>
                    {errors.maths && touched.maths && errors.maths}
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    name="science"
                    value={values.science}
                    label={"Science"}
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <Typography color={"red"}>
                    {errors.science && touched.science && errors.science}
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    name="gujarati"
                    value={values.gujarati}
                    label={"Gujarati"}
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <Typography color={"red"}>
                    {errors.gujarati && touched.gujarati && errors.gujarati}
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    name="english"
                    label={"English"}
                    value={values.english}
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <Typography color={"red"}>
                    {errors.english && touched.english && errors.english}
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
      </CardContent>
    </Card>
  );
}

export default Marks;
