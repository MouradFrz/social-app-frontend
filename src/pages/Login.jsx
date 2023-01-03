import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/userSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import colors from "../ui/colors";
const colorPalette = colors;
import { Form, Input, Button, Wrapper } from "../ui/components";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
	email: yup.string().required().email(),
	password: yup.string().required(),
});
function Login(props) {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const dispatch = useDispatch();
	function sendLogin(loginData) {
		setLoading(true);
		axios
			.post("http://localhost:3000/login", loginData)
			.then((res) => {
				if (res.data.token) {
					dispatch(
						updateUser(
							res.data.user.id,
							res.data.user.firstName,
							res.data.user.lastName,
							res.data.user.email,
							res.data.token
						)
					);
				} else {
					setError(true);
				}
			})
			.finally(() => {
				setLoading(false)
			});
	}
	function resetError() {
		setError(false);
	}
	return (
		<div
			style={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				background: colorPalette.SECONDARY,
			}}
		>
			<Wrapper>
				<Form onSubmit={handleSubmit(sendLogin)}>
					<div
						style={{
							position: "absolute",
							background: "#84848410",
							width: "100%",
							height: "100%",
							top: 0,
							left: 0,
							backdropFilter: "blur(1px)",
							zIndex: `${loading ? "0" : "-1"}`,
						}}
					></div>
					<h1 style={{ marginBottom: "30px" }}>Login</h1>
					<p style={{ marginBottom: "20px", color: "red" }}>
						{(errors.email || errors.password || error) &&
							"Invalid credentials"}
					</p>
					<label htmlFor="">Email</label>
					<Input
						type="text"
						placeholder="xyz@gmail.com"
						{...register("email", {
							onChange: () => {
								resetError();
							},
						})}
						//
					/>
					<label htmlFor="">Password</label>
					<Input
						type="password"
						placeholder="******"
						{...register("password", {
							onChange: () => {
								resetError();
							},
						})}
						// onChange={resetError}
					/>
					<p style={{ marginBottom: "10px" }}>
						Don't have an account yet ?{" "}
						<Link to="/register">Register Now!</Link>
					</p>
					<Button>Login</Button>
				</Form>
			</Wrapper>
		</div>
	);
}

export default Login;
