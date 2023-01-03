import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem("userData")
	? JSON.parse(localStorage.getItem("userData"))
	: {	
			apiUrl:"http://localhost:3000/",
			user: {
				token: "",
			},
	  };

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUser: {
			reducer: (state, { payload }) => {
				state.apiUrl="http://localhost:3000/";
				state.user = payload;
				localStorage.setItem("userData", JSON.stringify(state));
			},
			prepare: (id,firstname, lastname, email, token) => {
				return {
					payload: {
						id:id,
						name: `${firstname} ${lastname}`,
						email: email,
						token: token,
					},
				};
			},
		},
		logout: {
			reducer: (state, { payload }) => {
				state.user = {};
				localStorage.removeItem("userData");
			},
		},
	},
});
export default userSlice.reducer;
export const { updateUser, logout } = userSlice.actions;
