import React from "react";
import { useUserDataQuery, useGetUserStatsQuery } from "../store/userApi";
import { useSelector } from "react-redux";
function UserCard(props) {
	const userData = useSelector((state) => state.user.user);
	const apiUrl = useSelector((state) => state.user.apiUrl);
	const { data, isFetching, error } = useUserDataQuery(userData.id);
	const { data: stats } = useGetUserStatsQuery(userData.id);
	return (
		<div className="w-[30%] h-fit flex rounded-md flex-col sticky top-[75px] items-center p-3 border-4 border-primary mb-2 shadow-lg">
			<img
				src={
					data && data.pfpurl
						? `${apiUrl}profile-images/${
								data && data.pfpurl
						  }?t=${new Date().getTime()}`
						: "/pfp-placeholder.jpg"
				}
				alt="profile picture"
				className="md:w-[50%] w-full rounded-full aspect-square object-cover"
			/>
			<p className="text-2xl font-semibold mt-2 text-center ">
				{data && data.firstname} {data && data.lastname}
			</p>
			{stats && (
				<div className="mt-4 flex gap-3 flex-wrap	justify-center">
					<div className="flex flex-col p-1 border-t-4 border-primary items-center">
						<p className="font-bold">{stats.friends}</p>
						<p>Friends</p>
					</div>
					<div className="flex flex-col p-1 border-t-4 border-primary items-center">
						<p className="font-bold">{stats.posts}</p>
						<p>Posts</p>
					</div>
					<div className="flex flex-col p-1 border-t-4 border-primary items-center">
						<p className="font-bold">{stats.comments}</p>
						<p>Comments</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default UserCard;
