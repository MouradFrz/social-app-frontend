import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://mouradyaouscandiweb.000webhostapp.com",
	}),
	tagTypes: ["Profile", "Posts", "UserLikes", "Search", "Feeds"],
	endpoints: (builder) => ({
		userData: builder.query({
			query: (id) => `/userdata?id=${id}`,
			providesTags: ["Profile"],
		}),
		updateUser: builder.mutation({
			query: (data) => ({
				url: `/updateUser`,
				method: "POST",
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
			invalidatesTags: ["Posts", "Feeds"],
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
			query: (data) => ({
				url: `/deletePost`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Posts"],
		}),
		userLikes: builder.query({
			query: ({ token }) => `/getUserLikes?token=${token}`,
			providesTags: ["UserLikes"],
		}),
		loadLikes: builder.query({
			query: ({ idList, token }) => `/loadLikes?list=${idList}&token=${token}`,
			providesTags: ["UserLikes"],
		}),
		likePost: builder.mutation({
			query: (data) => ({
				url: "/likePost",
				method: "POST",
				body: data,
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
			query: (data) => ({
				url: "/unlikePost",
				method: "POST",
				body: data,
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
		searchUsers: builder.query({
			query: (keyword) => `/searchUsers?keyword=${keyword}`,
			providesTags: ["Search"],
		}),
		getUserStats: builder.query({
			query: (id) => `/getUserStats?id=${id}`,
			providesTags: ["Profile"],
		}),
		loadFeed: builder.query({
			query: ({ page, token }) => `/loadFeed?page=${page}&token=${token}`,
			providesTags: ["Feeds"],
		}),
	}),
});
export default userApi;
export const {
	useUserDataQuery,
	useLoadUserPostsQuery,
	useLazyLoadUserPostsQuery,
	useLazyLoadFeedQuery,
	useLazySearchUsersQuery,
	useUpdateUserMutation,
	useCreatePostMutation,
	useDeletePostMutation,
	useUserLikesQuery,
	useLikePostMutation,
	useUnlikePostMutation,
	useLoadLikesQuery,
	useGetUserStatsQuery,
} = userApi;
