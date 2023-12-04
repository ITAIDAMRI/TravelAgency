import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	items: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state, action) => {
			if (state.items.indexOf(action.payload) === -1) {
				state.items.push(action.payload);
			}
		},
		deleteItem: (state, action) => {
			console.log("action.payload.id", action.payload.id);
			for (let i = 0; i < state.items.length; i++) {
				if (state.items[i].id === action.payload.id) {
					console.log("state.items[i]", state.items[i]);
					state.items.splice(i, 1);
				}
			}
			// return state;
			// console.log("action.payload", action.payload);
			// const indx = state.items.indexOf(action.payload);
			// console.log("indx", indx);
			// if (indx !== -1) state.items.splice(indx);
		},
		clearCart: (state, action) => {
			state.items = [];
		},
	},
});

export const { addItem, deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
