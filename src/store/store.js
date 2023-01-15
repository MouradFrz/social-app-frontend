import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import userApi from "./userApi";
import commentApi from "./commentApi";
const store = configureStore({
	reducer: {
		user: userSlice,
		[userApi.reducerPath]: userApi.reducer,
		[commentApi.reducerPath]: commentApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApi.middleware).concat(commentApi.middleware),
});
export default store;
