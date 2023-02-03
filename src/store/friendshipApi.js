import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
const friendshipApi = createApi({
	reducerPath: "friendshipApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000",
		prepareHeaders: (headers, { getState }) => {
			headers.set("Authorization", `Bearer ${getState().user.user.token}`);
			return headers;
		},
	}),
	tagTypes: ["Friends"],
	endpoints: (builder) => ({
		loadFriends: builder.query({
			query: (id) => `loadFriends?userid=${id}`,
			providesTags: ["Friends"],
		}),
		userFriendList: builder.query({
			query: () => `userLoadFriends`,
            providesTags: ["Friends"],
		}),
		sentRequests: builder.query({
			query: () => `sentRequests`,
			providesTags: ["Friends"],
		}),
		receivedRequests: builder.query({
			query: () => `receivedRequests`,
			providesTags: ["Friends"],
		}),
        sendFriendRequest: builder.mutation({
			query: (data) => ({
                url:"sendFriendRequest",
                method:"POST",
                body:data
            }),
			invalidatesTags: ["Friends"],
		}),
        removeFriendRequest: builder.mutation({
			query: (data) => ({
                url:"removeFriendRequest",
                method:"POST",
                body:data
            }),
			invalidatesTags: ["Friends"],
		}),
        removeFriend: builder.mutation({
			query: (data) => ({
                url:"removeFriend",
                method:"POST",
                body:data
            }),
			invalidatesTags: ["Friends"],
		}),
        declineFriendRequest: builder.mutation({
			query: (data) => ({
                url:"declineFriendRequest",
                method:"POST",
                body:data
            }),
			invalidatesTags: ["Friends"],
		}),
        acceptFriendRequest: builder.mutation({
			query: (data) => ({
                url:"acceptFriendRequest",
                method:"POST",
                body:data
            }),
			invalidatesTags: ["Friends"],
		}),
		loadAllFriendRequests:builder.query({
			query:()=>"loadAllFriendRequests",
			providesTags:["Friends"]
		})
	}),
});
export default friendshipApi;
export const {
	useLoadFriendsQuery,
	useUserFriendListQuery,
	useSentRequestsQuery,
	useReceivedRequestsQuery,
    useSendFriendRequestMutation,
    useRemoveFriendRequestMutation,
    useRemoveFriendMutation,
    useDeclineFriendRequestMutation,
    useAcceptFriendRequestMutation,
	useLoadAllFriendRequestsQuery
} = friendshipApi;
