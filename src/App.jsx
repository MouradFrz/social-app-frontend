import { useSelector, useDispatch } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Messages from "./pages/Messages";
import Pusher from "pusher-js";
import { useEffect } from "react";
import chatApi from "./store/chatApi";
import { useState } from "react";
function protectedRoute(Component, token) {
	return token ? <Component /> : <Navigate to="/login" />;
}
function guestRoute(Component, token) {
	return !token ? <Component /> : <Navigate to="/" />;
}
function App() {
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const [refresh,setRefresh] = useState(false)
	useEffect(() => {
		const refreshFunction = setTimeout(() => {
			setRefresh((prev) => !prev);
		}, 29000);
		return () => {
			clearTimeout(refreshFunction);
		};
	}, [refresh]);
	useEffect(() => {
		const pusher = new Pusher("0eea2cdb4546d917675d", {
			cluster: "eu",
			encrypted: true,
		});
		let channel = pusher.subscribe(`general-${user.id}`);
		const handler = () => {
			dispatch(chatApi.util.invalidateTags(["Chat"]));
		};
		channel.bind("new-message", handler);
		return () => {
			channel.unbind("new-message", handler);
		};
	}, [refresh]);
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
		{
			path: "/messages/:convoid",
			element: protectedRoute(Messages, token),
		},
	]);
	return <div>{myRoutes}</div>;
}

export default App;
