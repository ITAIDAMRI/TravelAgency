import React, { useContext, useEffect } from "react";
import OverviewView from "./OverviewView";
import { AppStateContext } from "../../../AppUtils/AppStateContext";

export default function Overview() {
	const context = useContext(AppStateContext);
	const onPageStart = async () => {
		await context.validateUserLoggedIn();
	};

	useEffect(() => {
		onPageStart();
	}, []);

	return <OverviewView />;
}
