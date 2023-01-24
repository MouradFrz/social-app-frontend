import { useSelector, useDispatch } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function protectedRoute(Component, token) {
	return token ? <Component /> : <Navigate to="/login" />;
}
function guestRoute(Component, token) {
	return !token ? <Component /> : <Navigate to="/" />;
}
function App() {
	const { token } = useSelector((state) => state.user.user);
	const myRoutes = useRoutes([
		{
			path: "/",
			element: protectedRoute(Homepage, token),
		},
		{
			path: "/login",
			element: guestRoute(Login, token),
		},
		{
			path: "/register",
			element: guestRoute(Register, token),
		},
		{
			path: "/profile/:profileId",
			element: protectedRoute(Profile, token),
		},
	]);
	return <div>{myRoutes}</div>;
}

export default App;
