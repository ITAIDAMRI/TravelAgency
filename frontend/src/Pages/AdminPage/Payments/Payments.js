import React, { useContext, useEffect } from "react";
import PaymentsView from "./PaymentsView";
import { AppStateContext } from "../../../AppUtils/AppStateContext";

const Payments = () => {
	const context = useContext(AppStateContext);
	const onPageStart = async () => {
		await context.validateUserLoggedIn();
	};

	useEffect(() => {
		onPageStart();
	}, []);

	return <PaymentsView />;
};

export default Payments;
