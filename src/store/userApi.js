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
			invalidatesTags:["Posts"]
		}),
		loadUserPosts: builder.query({
			query:()=>({
				url:"/loadUserPosts",
				method:"GET",
			}),
			providesTags:["Posts"]
		})
	}),
});
export default userApi;
export const {
	useCurrentUserDataQuery,
	useLoadUserPostsQuery,
	useUpdateUserMutation,
	useCreatePostMutation,
} = userApi;
