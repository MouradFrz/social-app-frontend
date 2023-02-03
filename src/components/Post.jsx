import React, { useState } from "react";
import colors from "../ui/colors";
import moment from "moment";
import Dropdown from "./Dropdown";
import { Link, useParams } from "react-router-dom";
import {
	AiOutlineLike,
	AiFillLeftCircle,
	AiFillLike,
	AiFillRightCircle,
} from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { CgComment } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
	useDeletePostMutation,
	useLikePostMutation,
	useUnlikePostMutation,
} from "../store/userApi";
function Post({ data, allPosts, likes, likeCount, setPostDetails, myProfile }) {
	const apiUrl = useSelector((state) => state.user.apiUrl);
	const { id } = useParams();
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const myImages = allPosts
		.filter((el) => el.id === data.id)
		.map((el) => el.path);
	const [deletePost] = useDeletePostMutation();
	const [likePost] = useLikePostMutation();
	const [unlikePost] = useUnlikePostMutation();
	const ActionsList = [
		{
			title: (
				<span className="flex gap-2 items-center">
					<AiFillDelete />
					Delete this post
				</span>
			),
			onClick: () => {
				deletePost(data.id);
			},
		},
	];
	return (
		<div className="mb-2 border-primary relative p-5 border-4 bg-darkgrey/20 shadow-lg rounded-lg">
			{myProfile && (
				<Dropdown
					title={<BsThreeDots />}
					list={ActionsList}
					className="top-5  right-5 cursor-pointer"
				></Dropdown>
			)}
			<div className="flex">
				<img
					className="w-16 h-fit aspect-square rounded-full"
					src={
						data.pfpurl
							? `${apiUrl}profile-images/${
									data && data.pfpurl
							  }?t=${new Date().getTime()}`
							: "/pfp-placeholder.jpg"
					}
					alt=""
				/>
				<div className="flex flex-col pt-3 pl-3">
					{id === data.userid ? (
						<h1 to className="font-bold">
							{data.firstname} {data.lastname}
						</h1>
					) : (
						<Link to={`/profile/${data.userid}`} className="font-bold">
							{data.firstname} {data.lastname}
						</Link>
					)}
					<p>{moment(new Date(data.created_at)).fromNow()}</p>
				</div>
			</div>
			<div className="my-6">
				<p>{data.text}</p>
			</div>
			{data.path && (
				<div className="relative bg-white/50">
					<span className="absolute right-4 top-4 bg-black inline-block text-white z-20 px-3 rounded-xl">
						{currentImageIndex + 1}/{myImages.length}
					</span>
					<img
						className="w-full max-h-[1000px]  object-cover"
						src={`${apiUrl}/post-images/${myImages[currentImageIndex]}`}
						alt=""
						onClick={() => {
							setPostDetails({
								show: true,
								data,
								likeCount,
								myImages,
							});
						}}
					/>
					{myImages.length > 1 ? (
						<>
							<span
								onClick={() => {
									setCurrentImageIndex((prev) => {
										return (prev - 1 + myImages.length) % myImages.length;
									});
								}}
								className="absolute top-0 left-0 h-full cursor-pointer opacity-5 hover:opacity-80 bg-gradient-to-r transition-all duration-100 from-slate-600 p-10 flex items-center"
							>
								<AiFillLeftCircle className="text-4xl" />
							</span>
							<span
								onClick={() => {
									setCurrentImageIndex((prev) => {
										return (prev + 1) % myImages.length;
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
			<div className="flex gap-4 mt-4">
				<span className="flex items-center gap-1 font-semibold">
					{likes && !likes.includes(data.id) ? (
						<button
							className="flex gap-1 items-center"
							onClick={() => {
								likePost({
									postId: data.id,
									posts: allPosts
										?.map((el) => el.id)
										.filter(
											(item, index) =>
												allPosts?.map((el) => el.id).indexOf(item) === index
										),
								});
							}}
						>
							<AiOutlineLike /> <p>Like</p>{" "}
						</button>
					) : (
						<button
							className="flex gap-1 items-center"
							onClick={() => {
								unlikePost({
									postId: data.id,
									posts: allPosts
										?.map((el) => el.id)
										.filter(
											(item, index) =>
												allPosts?.map((el) => el.id).indexOf(item) === index
										),
								});
							}}
						>
							<AiFillLike /> <p>Unlike</p>{" "}
						</button>
					)}
					{likeCount}
				</span>
				<button
					className="flex items-center gap-1 font-semibold"
					onClick={() => {
						setPostDetails({
							show: true,
							data,
							likeCount,
							myImages,
						});
					}}
				>
					<CgComment /> <p>Comments</p>
				</button>
			</div>
		</div>
	);
}

export default Post;
