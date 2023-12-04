import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import { loadState } from "../AppUtils/localStorageIO";

const persistedState = () => {
	const localStorageState = loadState();
	if (localStorageState !== null) return localStorageState;
	return {};
};
const combinationReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
});

export const store = configureStore({
	reducer: combinationReducer,
	preloadedState: persistedState(),
});
