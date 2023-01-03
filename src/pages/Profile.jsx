import React from "react";
import { Button, Container } from "../ui/components";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import FriendCard from "../components/FriendCard";
import { useCurrentUserDataQuery } from "../store/userApi";
import axios from "axios";
import { useRef } from "react";
import userApi from "../store/userApi";
function Profile(props) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);
	axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
	const { data, isLoading, error } = useCurrentUserDataQuery(user.id);
	const profileInput = useRef(null);
	const profileImageRef = useRef(null);
	const apiUrl = useSelector((state) => state.user.apiUrl);
    
	const switchPic = () => {
		const fd = new FormData();
		fd.append("image", profileInput.current.files[0]);
		axios.post(`${apiUrl}uploadPicture`, fd).then((res) => {
			dispatch(userApi.util.invalidateTags(["Profile"]));
		});
	};
	return (
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

			<img
				src="https://ae01.alicdn.com/kf/H7cc01f6b96fd49318f2ccdba8d158ab5n/Travis-Scott-Astroworld-Flag-Any-Size-3x5ft-Flying-Banner-100D-Polyester-Decoration-Tapestry.png"
				style={{ width: "100%", height: "500px", objectFit: "cover" }}
				alt=""
			/>
			<div className="flex relative bottom-10 gap-10 pl-[4rem] bg-red-200 w-full">
				<div className="relative group overflow-hidden cursor-pointer">
					<img
						className="w-[14rem] rounded-full h-fit aspect-square border-8 border-secondary"
						src={`${apiUrl}profile-images/${data && data.pfpurl}`}
						alt="profile picture"
						ref={profileImageRef}
					/>
					<span
						onClick={() => {
							profileInput.current.click();
						}}
						className="w-[14rem]  top-0 group-hover:z-0 left-0 z-[-1] absolute h-fit aspect-square rounded-full  bg-primary/10"
					></span>
				</div>
				<div className="flex justify-end mt-10 gap-5 flex-col">
					<h1 className="font-bold text-4xl">{user.name}</h1>
					<p className="max-w-[70%]">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
						nostrum?
					</p>
					<Button>Edit profile</Button>
				</div>
			</div>
			<div className="flex h-3 gap-6">
				<div className="w-[40%] bg-blue-200">
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
	);
}

export default Profile;
