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
	}),
});
export default userApi;
export const { useCurrentUserDataQuery, useUpdateUserMutation } = userApi;
