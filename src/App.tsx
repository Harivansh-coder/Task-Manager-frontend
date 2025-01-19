import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import CreateTask from "./pages/CreateTask";
import {
  Navigate,
  Outlet,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { isAuthenticated } from "./lib/utils";

// defining routes
const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};
const PublicRoute = () => {
  return isAuthenticated() ? <Navigate to="/" /> : <Outlet />;
};

const routes = (
  <Router>
    {" "}
    <Routes>
      {" "}
      <Route path="/" element={<PrivateRoute />}>
        {" "}
        <Route path="/" element={<Home />} />{" "}
        <Route path="/create-task" element={<CreateTask />} />{" "}
      </Route>{" "}
      <Route path="/login" element={<PublicRoute />}>
        {" "}
        <Route path="/login" element={<Login />} />{" "}
      </Route>{" "}
      <Route path="/signup" element={<PublicRoute />}>
        {" "}
        <Route path="/signup" element={<SignUp />} />{" "}
      </Route>{" "}
      <Route path="/forgot-password" element={<ForgotPassword />} />{" "}
      <Route path="*" element={<h1>404 Not Found</h1>} />{" "}
    </Routes>{" "}
  </Router>
);

function App() {
  return (
    <>
      <div className="bg-gray-100 h-screen flex justify-center items-center">
        {routes}
      </div>
    </>
  );
}

export default App;
