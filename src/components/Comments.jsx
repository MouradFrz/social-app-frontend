import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
function Comments({ comment }) {
	const apiUrl = useSelector((state) => state.user.apiUrl);
	return (
		<div className="my-6">
			<div className="flex gap-2">
				<img
					src={`${apiUrl}profile-images/${comment.pfpurl}`}
					className="w-14 h-14 aspect-square object-cover rounded-full"
					alt=""
				/>
				<div>
					<p className="font-semibold">
						{comment.firstname} {comment.lastname}
					</p>
					<p className="text-sm text-gray-500">
						{moment(new Date(comment.created_at)).fromNow()}
					</p>
					<p>{comment.text}</p>
				</div>
			</div>
		</div>
	);
}

export default Comments;
