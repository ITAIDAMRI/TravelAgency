import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	id: "",
	token: "",
	first_name: "",
	last_name: "",
	permission: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			if (action.payload === null) {
				state = initialState;
			} else {
				state.token = action.payload.token;
				state.first_name = action.payload.first_name;
				state.last_name = action.payload.last_name;
				state.id = action.payload.id;
				state.permission = action.payload.permission;
			}
		},
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
