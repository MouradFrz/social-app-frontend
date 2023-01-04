import React, { useEffect, useState } from "react";
import { Button, Container } from "../ui/components";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import FriendCard from "../components/FriendCard";
import {
	useCurrentUserDataQuery,
	useUpdateUserMutation,
} from "../store/userApi";
import axios from "axios";
import { Input } from "../ui/components";
import { useRef } from "react";
import userApi from "../store/userApi";
import Modal from "../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
	bio: yup.string().max(200),
});
function Profile(props) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);
	const [modal, setModal] = useState(false);
	axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
	const { data, isLoading, error } = useCurrentUserDataQuery(user.id);
	const profileInput = useRef(null);
	const bannerInput = useRef(null);
	const apiUrl = useSelector((state) => state.user.apiUrl);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	useEffect(() => {
		if (data) {
			setValue("firstName", data.firstname);
			setValue("lastName", data.lastname);
			setValue("email", data.email);
			setValue("bio", data.bio);
		}
	}, [data]);
	const switchPic = () => {
		const fd = new FormData();
		fd.append("image", profileInput.current.files[0]);
		axios.post(`${apiUrl}uploadPicture`, fd).then((res) => {
			dispatch(userApi.util.invalidateTags(["Profile"]));
		});
	};
	const switchBanner = () => {
		const fd = new FormData();
		fd.append("image", bannerInput.current.files[0]);
		axios.post(`${apiUrl}uploadBanner`, fd).then((res) => {
			dispatch(userApi.util.invalidateTags(["Profile"]));
		});
	};
	const [updateUser, { isSuccess, isLoading: updateLoading, isError }] =
		useUpdateUserMutation();
	const editFormRef = useRef(null);
	const submitEditProfile = (data) => {
		updateUser({
			firstname: data.firstName,
			lastname: data.lastName,
			email: data.email,
			bio: data.bio,
		}).then((res) => {
			console.log(res);
			if (res.data.success) {
				setModal(false);
			}
		});
	};

	return (
		<div>
			<Modal
				show={modal}
				setShow={setModal}
				title="Edit profile"
				onConfirm={handleSubmit(submitEditProfile)}
				onCancel={() => {
					setValue("firstName", data.firstname);
					setValue("lastName", data.lastname);
					setValue("email", data.email);
					setValue("bio", data.bio);
				}}
			>
				<form ref={editFormRef} className="flex flex-col">
					<label htmlFor="">First Name</label>
					<Input placeholder="Alex" {...register("firstName")} />
					<label htmlFor="">Last Name</label>
					<Input placeholder="Standal" {...register("lastName")} />
					<label htmlFor="">Email</label>
					<Input placeholder="xys@botmail.co" {...register("email")} />
					<label htmlFor="">Bio</label>
					<Input
						placeholder="Say something about yourself ..."
						{...register("bio")}
					/>
				</form>
			</Modal>
			<Container>
				<input
					type="file"
					onChange={() => {
						switchPic();
					}}
					className="hidden"
					ref={profileInput}
					accept="image/*"
				/>
				<input
					type="file"
					onChange={() => {
						switchBanner();
					}}
					className="hidden"
					ref={bannerInput}
					accept="image/*"
				/>
				<div className="relative group overflow-hidden cursor-pointer">
					<img
						src={
							data && data.bannerurl
								? `${apiUrl}banner-images/${
										data && data.bannerurl
								  }?t=${new Date().getTime()}`
								: "/banner-placeholder.png"
						}
						style={{ width: "100%", height: "500px", objectFit: "cover" }}
						alt=""
					/>
					<span
						onClick={() => {
							bannerInput.current.click();
						}}
						className="w-full  top-0 group-hover:z-0 left-0 z-[-1] absolute h-fit aspect-square bg-gradient-to-t  from-darkgrey/20 to-primary/0 "
					></span>
				</div>

				<div className="flex relative bottom-10 gap-10 pl-[4rem] w-full">
					<div className="relative group overflow-hidden cursor-pointer">
						<img
							className="w-[14rem] rounded-full h-fit aspect-square border-8 border-secondary"
							src={
								data && data.pfpurl
									? `${apiUrl}profile-images/${
											data && data.pfpurl
									  }?t=${new Date().getTime()}`
									: "/pfp-placeholder.jpg"
							}
							alt="profile picture"
						/>
						<span
							onClick={() => {
								profileInput.current.click();
							}}
							className="w-[14rem]  top-0 group-hover:z-0 left-0 z-[-1] absolute h-fit aspect-square rounded-full  bg-primary/10"
						></span>
					</div>
					<div className="flex justify-end mt-10 gap-5 flex-col">
						<h1 className="font-bold text-4xl">
							{data && `${data.firstname} ${data.lastname}`}
						</h1>
						<p className="max-w-[70%]">
							{data && data.bio ? data.bio : "No bio yet"}
						</p>
						<Button
							onClick={() => {
								setModal(true);
							}}
						>
							Edit profile
						</Button>
					</div>
				</div>
				<div className="flex h-3 gap-6">
					<div className="w-[40%]">
						<h1 className="text-4xl mb-4 font-semibold">Friends</h1>
						<div className=" border-primary p-5 border-4 bg-darkgrey/20 shadow-md rounded-lg flex flex-wrap gap-3 gap-y-6 justify-center">
							<FriendCard />
							<FriendCard />
							<FriendCard />
							<FriendCard />
							<FriendCard />
						</div>
					</div>
					<div className="w-[60%]">
						<h1 className="text-4xl mb-4 font-semibold">Posts</h1>
						<Post />
						<Post />
						<Post />
						<Post />
						<Post />
						<Post />
					</div>
				</div>
			</Container>
		</div>
	);
}

export default Profile;
