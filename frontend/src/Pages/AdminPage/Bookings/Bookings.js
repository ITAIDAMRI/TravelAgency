import React, { useContext, useEffect } from "react";
import BookingsView from "./BookingsView";
import { AppStateContext } from "../../../AppUtils/AppStateContext";

const Bookings = () => {
	const context = useContext(AppStateContext);
	const onPageStart = async () => {
		await context.validateUserLoggedIn();
	};

	useEffect(() => {
		onPageStart();
	}, []);
	return <BookingsView />;
};

export default Bookings;
