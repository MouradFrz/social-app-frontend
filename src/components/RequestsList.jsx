import React from "react";

import { FaUserFriends } from "react-icons/fa";
import { useLoadAllFriendRequestsQuery } from "../store/friendshipApi";
import Dropdown from "./Dropdown";
import { useSelector } from "react-redux";
import FriendRequest from "./FriendRequest";
function RequestsList(props) {
	const token = useSelector((state) => state.user.user.token);
	const { data: requests } = useLoadAllFriendRequestsQuery({ token });

	const ActionList = requests
		? requests.map((el) => ({
				title: <FriendRequest data={el} />,
		  }))
		: [];
	return (
		<Dropdown
			title={
				<div className="relative">
					{requests && requests.length > 0 && (
						<span className="absolute top-0 right-0 bg-red-600 text-white px-1 translate-y-[-60%] translate-x-[80%] text-[0.6rem] rounded-full">
							{requests.length}
						</span>
					)}
					<FaUserFriends className="text-xl hover:text-black/60 transition-all" />
				</div>
			}
			className="relative"
			list={ActionList}
			listWidth={"400px"}
			emptyMessage={"No friend requests!"}
		></Dropdown>
	);
}

export default RequestsList;
