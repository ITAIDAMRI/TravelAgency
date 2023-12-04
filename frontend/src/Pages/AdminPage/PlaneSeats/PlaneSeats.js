import React, { useContext, useEffect, useState } from "react";

import PlaneSeatsView from "./PlaneSeatsView";
import { get_all_planes, get_plane } from "../../../API/Planes_calls";
import { PlaneSeatsContext } from "./PlaneSeatsContext";
import {
	add_plane_seat,
	add_plane_seats_by_number,
	delete_plane_seat,
	get_all_plane_seats_by_plane,
} from "../../../API/Plane_Seat_calls";
import { AppStateContext } from "../../../AppUtils/AppStateContext";

const initialDatTableState = { attributes: ["ID", "SeanNum"], values: [] };

const PlaneSeats = () => {
	const [planes, setPlanes] = useState([]);
	const [planeSeats, setPlaneSeats] = useState([]);
	const [displayContent, setDisplayContent] = useState(false);
	const [selectedPlane, setSelectedPlane] = useState(null);
	const [tableData, setTableData] = useState(initialDatTableState);
	const context = useContext(AppStateContext);
	const onPageStart = async () => {
		await context.validateUserLoggedIn();
	};

	const refreshPlanes = async () => {
		setPlanes(await get_all_planes());
	};

	const addSeats = async (number) => {
		const result = await add_plane_seats_by_number({
			planeId: selectedPlane.id,
			number: number,
		});
		refreshPlaneSeats();
	};

	useEffect(() => {
		onPageStart();
		refreshPlanes();
	}, []);

	useEffect(() => {
		setDisplayContent(true);
	}, [planes]);

	useEffect(() => {
		refreshPlaneSeats();
	}, [selectedPlane]);

	const refreshPlaneSeats = async () => {
		if (selectedPlane === null) return;
		const resultDataTable = [];
		const planeSeatsData = await get_all_plane_seats_by_plane(selectedPlane);
		for (const seat of planeSeatsData) {
			const seatRow = [];
			seatRow.push(seat.id);
			seatRow.push(seat.seatNum);
			resultDataTable.push(seatRow);
		}
		setTableData({
			attributes: initialDatTableState.attributes,
			values: resultDataTable,
		});
	};

	const selectPlane = async (planeId) => {
		const plane = await get_plane({ id: planeId });
		setSelectedPlane(plane);
	};

	const showContent = () => {
		if (!displayContent) return <>loading...</>;
		return <PlaneSeatsView />;
	};

	const deletePlaneSeat = async (seatId) => {
		await delete_plane_seat(seatId);
		refreshPlaneSeats();
	};

	return (
		<PlaneSeatsContext.Provider
			value={{
				planes: planes,
				planeSeats: planeSeats,
				selectPlane: selectPlane,
				addSeats: addSeats,
				tableData: tableData,
				deletePlaneSeat: deletePlaneSeat,
			}}
		>
			{<PlaneSeatsView />}
		</PlaneSeatsContext.Provider>
	);
};

export default PlaneSeats;
