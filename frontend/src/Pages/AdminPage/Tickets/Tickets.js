import React, { useContext, useEffect } from "react";
import TicketsView from "./TicketsView";
import { AppStateContext } from "../../../AppUtils/AppStateContext";

const Tickets = () => {
	const context = useContext(AppStateContext);
	const onPageStart = async () => {
		await context.validateUserLoggedIn();
	};

	useEffect(() => {
		onPageStart();
	}, []);

	return <TicketsView />;
};

export default Tickets;
