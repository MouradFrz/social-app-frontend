import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import axios from "axios";
function Homepage(props) {
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.user.user);
	const apiUrl = useSelector((state) => state.user.apiUrl);

	return (
		<div>
			<div>
				<Link to="/">Homepage</Link>
				<Link to="/login">Login</Link>
			</div>
			<br />
			<p>{userData.name}</p>
			<p>Homepage</p>
			<button

			>
				Logout
			</button>
		</div>
	);
}

export default Homepage;
