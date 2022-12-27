import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Students from "./pages/Students";
import Result from "./pages/Result";
import Marks from "./pages/Marks";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";

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
    {
      path: "/results",
      component: <Result />,
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
                  key={i}
                  path={route.path}
                  element={<PrivateRoute>{route.component}</PrivateRoute>}
                ></Route>
              );
            } else {
              return (
                <Route path={route.path} element={route.component} key={i} />
              );
            }
          })}
        </Routes>
      </Box>
    </>
  );
}

export default App;
