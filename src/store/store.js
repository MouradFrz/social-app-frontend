import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import userApi from "./userApi";
import commentApi from "./commentApi";
import friendshipApi from "./friendshipApi";
import chatApi from "./chatApi";
const store = configureStore({
	reducer: {
		user: userSlice,
		[userApi.reducerPath]: userApi.reducer,
		[commentApi.reducerPath]: commentApi.reducer,
		[friendshipApi.reducerPath]: friendshipApi.reducer,
		[chatApi.reducerPath]:chatApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApi.middleware).concat(commentApi.middleware).concat(friendshipApi.middleware).concat(chatApi.middleware),
});
export default store;
