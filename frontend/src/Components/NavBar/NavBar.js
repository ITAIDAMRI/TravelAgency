import React, { useContext, useEffect, useState } from "react";
import NavBarView from "./NavBarView";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppStateContext } from "../../AppUtils/AppStateContext";

export default function Navbar() {
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const context = useContext(AppStateContext);
	const [userTitle, setUserTitle] = useState("Guest");

	const [options, setOptions] = useState([]);
	const onStart = async () => {
		const resolvedOptions = [];
		if (await context.validateUserLoggedIn()) {
			if (user.permission === 1) {
				resolvedOptions.push("Admin");
			} else {
				resolvedOptions.push("Home");
				resolvedOptions.push("Cart");
			}
			resolvedOptions.push("Logout");
			setUserTitle(user.first_name + " " + user.last_name);
		} else {
			resolvedOptions.push("Login");
			resolvedOptions.push("Register");
			setUserTitle("Guest");
		}
		setOptions(resolvedOptions);
	};

	useEffect(() => {
		onStart();
	}, []);

	const goTo = (link) => {
		navigate(`/${link}`);
	};

	return <NavBarView options={options} goTo={goTo} userTitle={userTitle} />;
}
