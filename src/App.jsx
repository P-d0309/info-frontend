import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Students from "./pages/Students";
import Marks from "./pages/Marks";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";

function App() {
	const user = useSelector((state) => state.userdetails);

	const routes = [
    {
      path: "/",
      component: <Login />,
      isPrivate: false,
    },
    {
      path: "/login",
      component: <Login />,
      isPrivate: false,
    },
    {
      path: "/marks",
      component: <Marks />,
      isPrivate: true,
    },
    {
      path: "/students",
      component: <Students />,
      isPrivate: true,
    },
  ];

	const PrivateWrapper = ({ auth: user }) => {
		return user ? <Outlet /> : <Navigate to="/login" />;
	};
	return (
		<>
			<Header />
			<Box paddingX={20} paddingY={5}>
				<Routes>
					{routes.map((route, i) => {
						if (route.isPrivate) {
							return (
								<Route
									path={route.path}
									element={route.component}
									key={i}
								/>
							);
						} else {
							return (
								<Route
									path={route.path}
									element={route.component}
									key={i}
								/>
							);
						}
					})}
				</Routes>
			</Box>
		</>
	);
}

export default App;
