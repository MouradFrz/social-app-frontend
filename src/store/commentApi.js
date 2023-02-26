import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
const commentApi = createApi({
	reducerPath: "commentApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://mouradyaouscandiweb.000webhostapp.com",
		// prepareHeaders: (headers, { getState }) => {
		// 	headers.set("Authorization", `Bearer ${getState().user.user.token}`);
		// 	return headers;
		// },
		tagTypes: ["Comments"],
	}),
	endpoints: (builder) => ({
		uploadComment: builder.mutation({
			query: (comment) => ({
				url: "/uploadComment",
				method: "POST",
				body: comment,
			}),
			invalidatesTags: (res, err, arg) => {
				return [{ type: "Comments", id: arg.postid }];
			},
		}),
		loadComments: builder.query({
			query: (postId) => `loadComments?postid=${postId}`,
			providesTags: (res, err, arg) => {
				return [{ type: "Comments", id: arg }];
			},
		}),
	}),
});
export const { useUploadCommentMutation, useLoadCommentsQuery } = commentApi;
export default commentApi;
