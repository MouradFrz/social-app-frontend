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
	tagTypes: ["Profile"],
	endpoints: (builder) => ({
		currentUserData: builder.query({
			query: (id) => `/currentuserdata?id=${id}`,
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
			query: () => ({
				url: "/loadUserPosts",
				method: "GET",
			}),
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
		likePost: builder.mutation({
			query: (postId) => ({
				url: "/likePost",
				method: "POST",
				body: { postId },
			}),
			invalidatesTags: ["UserLikes"],
			onQueryStarted(postId, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					userApi.util.updateQueryData("userLikes", undefined, (likes) => {
						likes.push(postId);
					})
				);
				queryFulfilled.catch(
					dispatch(userApi.util.invalidateTags(["Profile"]))
				);
			},
		}),
		unlikePost: builder.mutation({
			query: (postId) => ({
				url: "/unlikePost",
				method: "POST",
				body: { postId },
			}),
			invalidatesTags: ["UserLikes"],
			onQueryStarted(postId, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					userApi.util.updateQueryData("userLikes", undefined, (likes) => {
						const indexOfNeededId = likes.indexOf(postId);
						likes.splice(indexOfNeededId, 1);
					})
				);
				queryFulfilled.catch(
					dispatch(userApi.util.invalidateTags(["Profile"]))
				);
			},
		}),
		loadLikes: builder.query({
			query: (idList) => `/loadLikes?list=${idList}`,
			providesTags: ["UserLikes"],
		}),
	}),
});
export default userApi;
export const {
	useCurrentUserDataQuery,
	useLoadUserPostsQuery,
	useUpdateUserMutation,
	useCreatePostMutation,
	useDeletePostMutation,
	useUserLikesQuery,
	useLikePostMutation,
	useUnlikePostMutation,
	useLoadLikesQuery,
} = userApi;
