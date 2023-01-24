import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000",
		prepareHeaders: (headers, { getState }) => {
			headers.set("Authorization", `Bearer ${getState().user.user.token}`);
			return headers;
		},
	}),
	tagTypes: ["Profile", "Posts", "UserLikes"],
	endpoints: (builder) => ({
		userData: builder.query({
			query: (id) => `/userdata?id=${id}`,
			providesTags: ["Profile"],
		}),
		updateUser: builder.mutation({
			query: (data) => ({
				url: `/updateUser`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["Profile"],
		}),
		createPost: builder.mutation({
			query: (data) => ({
				url: `/createPost`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Posts"],
		}),
		loadUserPosts: builder.query({
			query: ({ id, page }) => ({
				url: `/loadUserPosts?userid=${id}&page=${page}`,
				method: "GET",
			}),
			// serializeQueryArgs: ({ endpointName,queryArgs }) => {
			// 	return endpointName+queryArgs.id;
			// },
			// merge: (currentCache, newItems) => {
			// 	currentCache.push(...newItems);
			// },
			// // Refetch when the page arg changes
			// forceRefetch({ currentArg, previousArg }) {
			// 	const reload = previousArg ? currentArg.page !== previousArg.page : true
			// 	return reload
			// },

			providesTags: ["Posts"],
		}),
		deletePost: builder.mutation({
			query: (postId) => ({
				url: `/deletePost`,
				method: "POST",
				body: { postId },
			}),
			invalidatesTags: ["Posts"],
		}),
		userLikes: builder.query({
			query: () => "/getUserLikes",
			providesTags: ["UserLikes"],
		}),
		loadLikes: builder.query({
			query: (idList) => `/loadLikes?list=${idList}`,
			providesTags: ["UserLikes"],
		}),
		likePost: builder.mutation({
			query: ({ postId }) => ({
				url: "/likePost",
				method: "POST",
				body: { postId },
			}),
			invalidatesTags: ["UserLikes"],
			onQueryStarted({ postId, posts }, { dispatch, queryFulfilled }) {
				dispatch(
					userApi.util.updateQueryData("userLikes", undefined, (likes) => {
						likes.push(postId);
					})
				);
				dispatch(
					userApi.util.updateQueryData("loadLikes", posts, (likesList) => {
						const indexToBeChanged = likesList
							.map((el) => el.postid)
							.indexOf(postId);
						indexToBeChanged !== -1
							? likesList[indexToBeChanged].likecount++
							: likesList.push({ likecount: 1, postid: postId });
					})
				);
			},
		}),
		unlikePost: builder.mutation({
			query: ({ postId }) => ({
				url: "/unlikePost",
				method: "POST",
				body: { postId },
			}),
			invalidatesTags: ["UserLikes"],
			onQueryStarted({ postId, posts }, { dispatch, queryFulfilled }) {
				dispatch(
					userApi.util.updateQueryData("userLikes", undefined, (likes) => {
						const indexOfNeededId = likes.indexOf(postId);
						likes.splice(indexOfNeededId, 1);
					})
				);
				dispatch(
					userApi.util.updateQueryData("loadLikes", posts, (likesList) => {
						const indexOfNeededId = likesList
							.map((el) => el.postid)
							.indexOf(postId);
						likesList[indexOfNeededId].likecount === 1
							? likesList.splice(indexOfNeededId, 1)
							: likesList[indexOfNeededId].likecount--;
					})
				);
			},
		}),
	}),
});
export default userApi;
export const {
	useUserDataQuery,
	useLoadUserPostsQuery,
	useLazyLoadUserPostsQuery,
	useUpdateUserMutation,
	useCreatePostMutation,
	useDeletePostMutation,
	useUserLikesQuery,
	useLikePostMutation,
	useUnlikePostMutation,
	useLoadLikesQuery,
} = userApi;
