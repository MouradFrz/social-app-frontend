import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
const chatApi = createApi({
	reducerPath: "chatApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://mouradyaouscandiweb.000webhostapp.com",
		// prepareHeaders: (headers, { getState }) => {
		// 	headers.set("Authorization", `Bearer ${getState().user.user.token}`);
		// 	return headers;
		// },
	}),
	tagTypes: ["Chat", "Conversation"],
	endpoints: (builder) => ({
		loadAllConversations: builder.query({
			query: ({ token }) => `/loadAllConversations?token=${token}`,
			providesTags: ["Chat"],
		}),
		loadMessages: builder.query({
			query: (convoid) => `loadMessages?convoid=${convoid}`,
			providesTags: (res, err, arg) => {
				return [{ type: "Conversation", id: arg }];
			},
		}),
		loadConvoContact: builder.query({
			query: ({convoid,token}) => `loadConvoContact?convoid=${convoid}&token=${token}`,
			providesTags: ["Conversation"],
		}),
		loadEmptyConvos: builder.query({
			query: ({ token }) => `/loadEmptyConvos?token=${token}`,
			providesTags: ["Chat"],
		}),
		sendMessage: builder.mutation({
			query: (data) => ({
				method: "POST",
				body: data,
				url: "/sendMessage",
			}),
		}),
	}),
});
export default chatApi;
export const {
	useLoadAllConversationsQuery,
	useLoadMessagesQuery,
	useLazyLoadMessagesQuery,
	useLoadConvoContactQuery,
	useLoadEmptyConvosQuery,
	useSendMessageMutation,
} = chatApi;
