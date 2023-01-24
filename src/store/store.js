import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import userApi from "./userApi";
import commentApi from "./commentApi";
import friendshipApi from "./friendshipApi";
const store = configureStore({
	reducer: {
		user: userSlice,
		[userApi.reducerPath]: userApi.reducer,
		[commentApi.reducerPath]: commentApi.reducer,
		[friendshipApi.reducerPath]: friendshipApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApi.middleware).concat(commentApi.middleware).concat(friendshipApi.middleware),
});
export default store;
