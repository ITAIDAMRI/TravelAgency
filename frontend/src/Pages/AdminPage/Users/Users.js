import React, { useContext, useEffect } from "react";
import UsersView from "./UsersView";
import { AppStateContext } from "../../../AppUtils/AppStateContext";

export default function Users() {
	const context = useContext(AppStateContext);
	const onPageStart = async () => {
		await context.validateUserLoggedIn();
	};

	useEffect(() => {
		onPageStart();
	}, []);

	return <UsersView />;
}
