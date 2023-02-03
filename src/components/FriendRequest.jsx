import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	useDeclineFriendRequestMutation,
	useAcceptFriendRequestMutation,
} from "../store/friendshipApi";
const FriendRequest = ({ data }) => {
	const apiUrl = useSelector((state) => state.user.apiUrl);
	const [declineFriendRequest] = useDeclineFriendRequestMutation();
	const [acceptFriendRequest] = useAcceptFriendRequestMutation();
	return (
		<div className="flex gap-3">
			<img
				src={
					data && data.pfpurl
						? `${apiUrl}profile-images/${
								data && data.pfpurl
						  }?t=${new Date().getTime()}`
						: "/pfp-placeholder.jpg"
				}
				className="w-14 rounded-full h-14 object-cover"
				alt="pfp"
			/>
			<div className="flex flex-col  justify-center">
				<Link to={`/profile/${data.id}`} className="text-left font-semibold">
					{data.firstname} {data.lastname}
				</Link>
				<div>
					<button
						onClick={() => {
							acceptFriendRequest(data.id);
						}}
						className="bg-primary px-2 rounded-sm mr-3"
					>
						Accept
					</button>
					<button
						onClick={() => {
							declineFriendRequest(data.id);
						}}
						className="bg-gray-400 px-2 rounded-sm"
					>
						Decline
					</button>
				</div>
			</div>
		</div>
	);
};

export default FriendRequest;
