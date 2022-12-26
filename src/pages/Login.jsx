import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { userActions } from "../_actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const baseUrl = import.meta.env.VITE_BASE_API_URL;
	const user = useSelector((state) => state.userdetails);
	
	useEffect(() => {
		if (Object.keys(user).length > 0) {
			return navigate("/students");
		}
	}, []);

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Invalid email")
			.required("Email is Required"),
		password: Yup.string()
			.required("Password is Required")
			.min(8, "Minimum 8 characters are required")
			.max(16, "Maximum allowed characters are 16."),
	});
	const submitForm = (values, { setFieldError, setSubmitting }) => {
		const data = {
			email: values.email,
			password: values.password,
		};
		const login = `${baseUrl}/login`;

		axios
			.post(login, data)
			.then((res) => {
				const user = res.data.data;

				localStorage.setItem("user", JSON.stringify(user));
				dispatch(userActions.login(user));
				return navigate("students");9
				
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
		<Card>
			<CardHeader title="Login"></CardHeader>
			<CardContent>
				<Formik
					initialValues={{ email: "", password: "" }}
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
									<TextField
										fullWidth
										id="email"
										label="Email"
										variant="outlined"
										type="email"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
									/>
									<Typography color={"red"}>
										{errors.email &&
											touched.email &&
											errors.email}
									</Typography>
								</Grid>
								<Grid item sm={12}>
									<TextField
										fullWidth
										id="password"
										label="Password"
										variant="outlined"
										type="password"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.password}
									/>
									<Typography color={"red"}>
										{errors.password &&
											touched.password &&
											errors.password}
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
};

export default Login;
