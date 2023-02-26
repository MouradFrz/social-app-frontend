import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import moment from "moment";
import { useLikePostMutation, useUnlikePostMutation } from "../store/userApi";
import {
	useUploadCommentMutation,
	useLoadCommentsQuery,
} from "../store/commentApi";
import Comments from "./Comments";
import { Button } from "../ui/components";
import {
	AiOutlineLike,
	AiFillLeftCircle,
	AiFillLike,
	AiFillRightCircle,
} from "react-icons/ai";
import { useEffect } from "react";

function PostDetails({
	postDetails,
	setPostDetails,
	likes,
	likeCount,
	allPosts,
}) {
	const apiUrl = useSelector((state) => state.user.apiUrl);
	const token = useSelector((state) => state.user.user.token);
	const [likePost] = useLikePostMutation();
	const [unlikePost] = useUnlikePostMutation();
	const [uploadComment] = useUploadCommentMutation();
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [commentText, setCommentText] = useState("");
	const { data, isLoading, error } = useLoadCommentsQuery(
		postDetails?.data?.id ? postDetails?.data?.id : 0
	);
	useEffect(()=>{
		setCurrentImageIndex(0)
	},[postDetails.show])
	return (
		<div
			className={`bg-black/30 ${
				postDetails.show ? "" : "hidden"
			} fixed z-50 left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center top-[50%] w-full h-full `}
		>
			<div
				className={` h-[95%]  ${
					postDetails.myImages && postDetails.myImages[0]
						? "w-[95%]"
						: "max-w-[95%] w-[700px]"
				} flex bg-white shadow-lg rounded-md`}
			>
				{postDetails.myImages && postDetails.myImages[0] && (
					<div className="w-[calc(100%-500px)] relative flex justify-center items-center bg-black">
						<span className="absolute right-4 top-4 bg-black inline-block text-white z-20 px-3 rounded-xl">
							{currentImageIndex + 1}/{postDetails.myImages?.length}
						</span>
						<img
							className="max-h-full max-w-full"
							src={`${apiUrl}/post-images/${
								postDetails.myImages && postDetails.myImages[currentImageIndex]
							}`}
							alt=""
						/>
						{postDetails.myImages?.length > 1 ? (
							<>
								<span
									onClick={() => {
										setCurrentImageIndex((prev) => {
											return (
												(prev - 1 + postDetails.myImages.length) %
												postDetails.myImages.length
											);
										});
									}}
									className="absolute top-0 left-0 h-full cursor-pointer opacity-5 hover:opacity-80 bg-gradient-to-r transition-all duration-100 from-slate-600 p-10 flex items-center"
								>
									<AiFillLeftCircle className="text-4xl" />
								</span>
								<span
									onClick={() => {
										setCurrentImageIndex((prev) => {
											return (prev + 1) % postDetails.myImages.length;
										});
									}}
									className="absolute top-0 right-0 h-full cursor-pointer opacity-5 hover:opacity-80 bg-gradient-to-l transition-all duration-100 from-slate-600 p-10 flex items-center "
								>
									<AiFillRightCircle className="text-4xl" />
								</span>
							</>
						) : (
							""
						)}
					</div>
				)}
				<div
					className={`${
						postDetails.myImages && postDetails.myImages[0]
							? "w-[500px]"
							: "w-[700px]"
					} relative border-primary p-5 border-4 bg-darkgrey/20 rounded-lg overflow-hidden`}
				>
					<button
						className="absolute right-2 z-40 top-3"
						onClick={() => {
							setPostDetails({
								show: false,
							});
						}}
					>
						<AiOutlineClose className="text-2xl" />
					</button>
					<div className="mb-2 flex flex-col h-full">
						<div className="flex">
							<img
								className="w-16 h-fit aspect-square rounded-full"
								src={
									postDetails.data?.pfpurl
										? `${apiUrl}profile-images/${
												postDetails.data && postDetails.data.pfpurl
										  }?t=${new Date().getTime()}`
										: "/pfp-placeholder.jpg"
								}
								alt=""
							/>
							<div className="flex flex-col pt-3 pl-3">
								<h1 className="font-bold">
									{postDetails.data?.firstname} {postDetails.data?.lastname}
								</h1>
								<p>
									{moment(new Date(postDetails.data?.created_at)).fromNow()}
								</p>
							</div>
						</div>
						<div className="my-6">
							<p>{postDetails.data?.text}</p>
						</div>
						<div className="flex gap-4 my-4">
							<span className="flex items-center gap-1 font-semibold">
								{likes && !likes.includes(postDetails.data?.id) ? (
									<button
										className="flex gap-1 items-center"
										onClick={() => {
											const fd = new FormData();
											fd.append("postId", postDetails.data.id);
											fd.append(
												"posts",
												allPosts
													?.map((el) => el.id)
													.filter(
														(item, index) =>
															allPosts?.map((el) => el.id).indexOf(item) ===
															index
													)
											);
											fd.append("token", token);
											likePost(fd);
										}}
									>
										<AiOutlineLike /> <p>Like</p>{" "}
									</button>
								) : (
									<button
										className="flex gap-1 items-center"
										onClick={() => {
											const fd = new FormData();
											fd.append("postId", postDetails.data.id);
											fd.append(
												"posts",
												allPosts
													?.map((el) => el.id)
													.filter(
														(item, index) =>
															allPosts?.map((el) => el.id).indexOf(item) ===
															index
													)
											);
											fd.append("token", token);
											unlikePost(fd);
										}}
									>
										<AiFillLike /> <p>Unlike</p>{" "}
									</button>
								)}
								{likeCount}
							</span>
						</div>
						<div>
							<textarea
								value={commentText}
								onChange={(ev) => {
									setCommentText(ev.target.value);
								}}
								placeholder="Say something!"
								className="w-full rounded-sm outline-none p-4 resize-none h-fit"
							></textarea>
							<Button
								onClick={() => {
									const fd = new FormData();
									fd.append("text", commentText);
									fd.append("postid", postDetails.data.id);
									fd.append("token", token);
									uploadComment(fd);
									setCommentText("");
								}}
							>
								Comment
							</Button>
						</div>
						<div className="overflow-y-scroll mt-2">
							{data && data.length ? (
								data.map((el, i) => {
									return <Comments comment={el} key={i} />;
								})
							) : (
								<p className="text-center">
									No comments yet! Be the first one to leave a comment.
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PostDetails;
