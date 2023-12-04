import React, { useContext, useEffect, useState } from "react";
import PlanesView from "./PlanesView";
import { PlanesContext } from "./PlanesContext";
import {
	add_plane,
	delete_plane,
	get_all_planes,
} from "../../../API/Planes_calls";
import { AppStateContext } from "../../../AppUtils/AppStateContext";

export default function Planes() {
	const [displayContent, setDisplayContent] = useState(false);
	const [planes, setPlanes] = useState([]);
	const [planesTableData, setPlanesTableData] = useState([]);
	const context = useContext(AppStateContext);
	const onPageStart = async () => {
		await context.validateUserLoggedIn();
	};

	const submitForm = async (requestObject) => {
		if (await add_plane(requestObject)) alert("Plane added successfully");
		await refreshPlanes();
	};

	const refreshPlanes = async () => setPlanes(await get_all_planes());

	const deletePlane = async (requestObject) => {
		const queryResult = await delete_plane(requestObject);
		refreshPlanes();
	};

	useEffect(() => {
		onPageStart();
		refreshPlanes();
	}, []);

	useEffect(() => {
		const tableData = [];
		planes.forEach((plane) => {
			const planeData = [];
			planeData.push(plane.id);
			planeData.push(plane.company);
			planeData.push(plane.model);
			tableData.push(planeData);
		});
		setPlanesTableData(tableData);
		setDisplayContent(true);
	}, [planes]);

	const showContent = () => {
		if (!displayContent) return <>loading...</>;
		return <PlanesView />;
	};

	return (
		<PlanesContext.Provider
			value={{
				planes: planes,
				setPlanes: setPlanes,
				addPlane: submitForm,
				tableData: planesTableData,
				deletePlane: deletePlane,
			}}
		>
			{showContent()}
		</PlanesContext.Provider>
	);
}
