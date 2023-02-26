import React from "react";
import { useEffect } from "react";
import Post from "./Post";
import PostDetails from "./PostDetails";
import {
	useLazyLoadUserPostsQuery,
	useLazyLoadFeedQuery,
	useUserLikesQuery,
	useLoadLikesQuery,
} from "../store/userApi";
import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
function FeedPosts({ setPostDetails, postDetails }) {
	const [loadingMore, setLoadingMore] = useState(false);
	const [page, setPage] = useState(1);
	const postsContainer = useRef(null);
	const token = useSelector((state) => state.user.user.token);
	const [reloadPosts, { data: posts }] = useLazyLoadFeedQuery();
	const { data: userLikes } = useUserLikesQuery({token});
	const {
		data: likes,
		isLoading: likesLoading,
		error: likesError,
	} = useLoadLikesQuery({
		idList: posts
			?.map((el) => el.id)
			.filter(
				(item, index) => posts?.map((el) => el.id).indexOf(item) === index
			),
		token,
	});
	useEffect(() => {
		reloadPosts({ token, page });
	}, []);
	useEffect(() => {
		const onScroll = () => {
			if (
				postsContainer.current.getBoundingClientRect().bottom < 750 &&
				!loadingMore
			) {
				setLoadingMore(true);
			}
		};
		document.addEventListener("scroll", onScroll);
		return () => {
			document.removeEventListener("scroll", onScroll);
		};
	}, [loadingMore]);
	useEffect(() => {
		const oldPostsLength = posts?.length;
		if (loadingMore) {
			reloadPosts({ token, page: page + 1 }).then((res) => {
				if (res.data.length !== oldPostsLength) setPage((prev) => prev + 1);
			});
		}
	}, [loadingMore]);
	useEffect(() => {
		setLoadingMore(false);
	}, [posts]);
	return (
		<div className="w-full h-fit-content" ref={postsContainer}>
			<PostDetails
				postDetails={postDetails}
				likes={userLikes}
				setPostDetails={setPostDetails}
				likeCount={
					likes?.filter((el) => el.postid == postDetails?.data?.id)[0]
						? likes?.filter((el) => el.postid == postDetails?.data?.id)[0]
								.likecount
						: 0
				}
				allPosts={posts}
			/>
			{posts && posts.length ? (
				posts
					.filter((el, i, self) => {
						return i === self.findIndex((element) => element.id === el.id);
					})
					.map((el, i) => {
						return (
							<Post
								key={el.id}
								data={el}
								allPosts={posts}
								setPostDetails={setPostDetails}
								likes={userLikes}
								myProfile={false}
								likeCount={
									likes?.map((like) => like.postid).includes(el.id)
										? likes[likes.map((like) => like.postid).indexOf(el.id)]
												.likecount
										: 0
								}
							/>
						);
					})
			) : (
				<div className="p-5 border-4 border-primary shadow-lg rounded-sm">
					<h2 className="text-center font-semibold">
						You have no posts! You can publish your first post whenever you are
						ready!
					</h2>
				</div>
			)}
		</div>
	);
}

export default FeedPosts;
