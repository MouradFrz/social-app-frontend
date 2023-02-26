import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import colors from "../ui/colors";
const colorPalette = colors;
import { useSelector } from "react-redux";
import { Form, Input, Button, Wrapper } from "../ui/components";
import { Link } from "react-router-dom";
import axios from "axios";
const schema = yup.object().shape({
	firstName: yup
		.string()
		.matches(/^[a-z ,.'-]+$/i)
		.min(2)
		.required(),
	lastName: yup
		.string()
		.matches(/^[a-z ,.'-]+$/i)
		.min(2)
		.required(),
	email: yup.string().email().required(),
	password: yup
		.string()
		.matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
		.min(6)
		.required(),
	confirmPassword: yup
		.mixed()
		.oneOf([yup.ref("password"), null], "Passwords must match"),
});
function Register(props) {
	const [error, setError] = useState("");
	const [succes, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const apiUrl = useSelector((state) => state.user.apiUrl);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const submitRegister = (data) => {
		setError("");
		setSuccess(false);
		setLoading(true);
		fetch(`${apiUrl}register`, { body: JSON.stringify(data), method: "POST" })
			.then((res) => res.json())
			.then((res) => {
				setSuccess(true);
			})
			.catch((res) => {
				console.log(res);
				setError(res.response.data.message);
			})
			.finally((res) => {
				setLoading(false);
			});
	};
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
				<Form
					style={{ position: "relative" }}
					onSubmit={handleSubmit(submitRegister)}
				>
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
					<h1 style={{ marginBottom: "30px" }}>Register</h1>
					{error && (
						<p
							style={{ color: "red", fontWeight: "bold", marginBottom: "20px" }}
						>
							{error}
						</p>
					)}
					{succes && (
						<p
							style={{
								color: "green",
								fontWeight: "bold",
								marginBottom: "20px",
							}}
						>
							Successfully registered. You can log in.
						</p>
					)}
					<Input
						placeholder="First Name"
						{...register("firstName")}
						style={{ borderColor: `${errors.firstName ? "red" : ""}` }}
					/>
					<Input
						placeholder="Last Name"
						{...register("lastName")}
						style={{ borderColor: `${errors.lastName ? "red" : ""}` }}
					/>
					<Input
						placeholder="Email"
						{...register("email")}
						style={{ borderColor: `${errors.email ? "red" : ""}` }}
					/>
					<Input
						type="password"
						placeholder="Password"
						{...register("password")}
						style={{ borderColor: `${errors.password ? "red" : ""}` }}
					/>
					<Input
						type="password"
						placeholder="Confirm Password"
						{...register("confirmPassword")}
						style={{ borderColor: `${errors.confirmPassword ? "red" : ""}` }}
					/>
					<p style={{ marginBottom: "10px" }}>
						Already have an account? <Link to="/login">Login Now!</Link>
					</p>
					<Button>Register</Button>
				</Form>
			</Wrapper>
		</div>
	);
}

export default Register;
