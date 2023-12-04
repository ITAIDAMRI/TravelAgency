import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Home from "./Pages/Home";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import AdminPage from "./Pages/AdminPage/AdminPage";
import { AppStateContext } from "./AppUtils/AppStateContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { store } from "./appState/store";
import { clearLocalStorage, saveState } from "./AppUtils/localStorageIO";
import { checkLoggedIn, log_out } from "./API/User_calls";
import { setUser } from "./appState/userSlice";
import Cart from "./Pages/Cart";

function App() {
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [refresh, setRefresh] = useState(false);
	store.subscribe(() => {
		saveState({
			user: store.getState().user,
			cart: store.getState().cart,
		});
	});

	const validateUserLoggedIn = async () => {
		console.log("window.location.href", window.location.href);
		const result = await checkLoggedIn(user);
		if (!result.loggedIn) {
			dispatch(setUser(null));
			await clearLocalStorage();
			if (
				!window.location.href.split("/")[
					window.location.href.split("/").length - 1
				] == "Register"
			)
				navigate("/Login");
			setRefresh(true);
			return false;
		}
		return true;
	};

	const logout = async () => {
		const queryResults = await log_out(user);
		if (!queryResults) return;
		clearLocalStorage();
		dispatch(setUser(null));
		navigate("/Login");
	};

	const login = async () => {
		if (await validateUserLoggedIn()) {
			if (user.permission === 1) navigate("/Admin");
			else navigate("/Home");
		}
	};

	return (
		<AppStateContext.Provider
			value={{
				validateUserLoggedIn: validateUserLoggedIn,
				logout: logout,
				login: login,
				refresh: refresh,
			}}
		>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Home" element={<Home />} />
				<Route path="/Register" element={<Registration />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/Admin" element={<AdminPage />} />
				<Route path="/Cart" element={<Cart />} />
			</Routes>
		</AppStateContext.Provider>
	);
}

export default App;
