import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function FriendCard({ data }) {
	const apiUrl = useSelector((state) => state.user.apiUrl);
	return (
		<Link className="w-40 group block" to={`/profile/${data.id}`}>
			<div className="rounded-lg aspect-square object-cover relative">
                <span className="w-full h-full bg-white/10 hidden group-hover:block rounded-lg absolute"></span>
				<img
					className="rounded-lg aspect-square object-cover"
					src={
						data && data.pfpurl
							? `${apiUrl}profile-images/${
									data && data.pfpurl
							  }?t=${new Date().getTime()}`
							: "/pfp-placeholder.jpg"
					}
					alt=""
				/>
			</div>

			<p className="font-bold text-lg group-hover:underline">
				{data.firstname} {data.lastname}
			</p>
		</Link>
	);
}

export default FriendCard;
