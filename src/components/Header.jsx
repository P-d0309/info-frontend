import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../_actions/user.actions";

const Header = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const user = useSelector((state) => state.userdetails);
	
	useEffect(() => {
		const user = localStorage.getItem('user')
		if (user) {
			dispatch(userActions.login(JSON.parse(user)));
		} 
	}, [])

	const logout = () => {
		const user = localStorage.clear();
		dispatch(userActions.logout());
		return navigate('/');
	}

	const routes = [
		{
			name: "Login",
			path: "/login",
		},
	];

	const privateRoutes = [
    {
      path: "/marks",
      name: "Marks",
      isPrivate: true,
    },
    {
      path: "/students",
      name: "Students",
      isPrivate: true,
    },
  ];
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Student Application
					</Typography>
					{Object.keys(user).length === 0 &&
						routes.map((route, i) => {
							return (
								<Link
									component={RouterLink}
									to={route.path}
									key={i}
								>
									<Button
										color="primary"
										sx={{ m: 1, color: "#ffffff" }}
									>
										{route.name}
									</Button>
								</Link>
							);
						})}
					{Object.keys(user).length > 0 &&
						privateRoutes.map((route, i) => {
							return (
								<Link
									component={RouterLink}
									to={route.path}
									key={i}
								>
									<Button
										color="primary"
										sx={{ m: 1, color: "#ffffff" }}
									>
										{route.name}
									</Button>
								</Link>
							);
						})}
					{Object.keys(user).length > 0 && (
						<Button
							color="primary"
							sx={{ m: 1, color: "#ffffff" }}
							onClick={logout}
						>
							Logout
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
