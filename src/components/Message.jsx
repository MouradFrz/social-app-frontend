import React from "react";
import { useSelector } from "react-redux";
function Message({ data }) {
	const apiUrl = useSelector((state) => state.user.apiUrl);
	return (
		<div className="flex gap-4">
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
			<div className="overflow-hidden max-h-14">
				<p className="font-semibold text-left">
					{data.firstname + " " + data.lastname}
				</p>
				<p className="text-left mt-1">{data.text || "Send a message to " + data.firstname + " now!"}</p>
			</div>
		</div>
	);
}

export default Message;
