import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import userApi from "./userApi";
const store = configureStore({
	reducer: {
		user: userSlice,
		[userApi.reducerPath]: userApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApi.middleware),
});
export default store;
