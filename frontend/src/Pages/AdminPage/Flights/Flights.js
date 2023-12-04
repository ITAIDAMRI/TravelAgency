import React, { useContext, useEffect, useState } from "react";
import FlightsView from "./FlightsView";
import { get_all_planes, get_plane } from "../../../API/Planes_calls";
import { get_all_countries, get_country } from "../../../API/Country_calls";
import { FlightsContext } from "./FlightsContext";
import {
	add_flight,
	delete_flight,
	get_all_flights,
} from "../../../API/Flight_calls";
import { AppStateContext } from "../../../AppUtils/AppStateContext";

const initialTableDataState = {
	attributes: [
		"ID",
		"Origin",
		"Destination",
		"Plane",
		"Date",
		"Departure",
		"Ticket Price",
	],
	values: [],
};

const Flights = () => {
	const [flights, setFlights] = useState([]);
	const [planes, setPlanes] = useState([]);
	const [selectedPlane, setSelectedPlane] = useState(null);
	const [countries, setCountries] = useState([]);
	const [selectedOrigin, setSelectedOrigin] = useState(null);
	const [selectedDestination, setSelectedDestination] = useState(null);
	const [selectedDate, setSelectedDate] = useState(null);
	const [tableData, setTableData] = useState(initialTableDataState);
	const [depart_time, setDepart_time] = useState(null);
	const [price, setPrice] = useState(null);
	const [duration, setDuration] = useState(null);
	const context = useContext(AppStateContext);
	const onPageStart = async () => {
		await context.validateUserLoggedIn();
	};

	const refreshPlanes = async () => {
		setPlanes(await get_all_planes({}));
	};

	const refreshCountries = async () => {
		setCountries(await get_all_countries({}));
	};

	const refreshFlights = async () => {
		setFlights(await get_all_flights({}));
	};
	const refreshTableData = async () => {
		const flightsTableData = [];

		for (const flight of flights) {
			// console.log("flight.date", flight.date);
			const flightDataRow = [];
			flightDataRow.push(flight.id);
			const originObj = await get_country({ id: flight.originId });
			flightDataRow.push(originObj.name);
			const destinationObj = await get_country({ id: flight.destinationId });
			flightDataRow.push(destinationObj.name);
			const planeObj = await get_plane({ id: flight.planeId });
			flightDataRow.push(planeObj.company + " " + planeObj.model);
			flightDataRow.push(flight.date);
			flightDataRow.push(flight.depart_time);
			flightDataRow.push(flight.price_usd);
			flightsTableData.push(flightDataRow);
		}
		setTableData({
			attributes: initialTableDataState.attributes,
			values: flightsTableData,
		});
	};

	const submitForm = async (requestObject) => {
		if (await add_flight(requestObject)) {
			alert("Flight added successfully");
			refreshFlights();
		}
	};

	const refreshAllData = async () => {
		await refreshFlights();
		await refreshPlanes();
		await refreshCountries();
	};

	const deleteFlight = async (requestObject) => {
		await delete_flight(requestObject);
		alert("Flight deleted successfully");
		refreshFlights();
	};

	useEffect(() => {
		onPageStart();
		refreshAllData();
	}, []);

	useEffect(() => {
		refreshTableData();
	}, [flights]);

	useEffect(() => {
		console.log("selectedDestination", selectedPlane);
	}, [selectedPlane]);

	useEffect(() => {
		console.log("tableData", tableData);
	}, [tableData]);

	return (
		<FlightsContext.Provider
			value={{
				planes: planes,
				countries: countries,
				selectedOrigin: selectedOrigin,
				selectedDestination: selectedDestination,
				selectedPlane: selectedPlane,
				setSelectedPlane: setSelectedPlane,
				setSelectedOrigin: setSelectedOrigin,
				setSelectedDestination: setSelectedDestination,
				setSelectedDate: setSelectedDate,
				setDepart_time: setDepart_time,
				setPrice: setPrice,
				setDuration: setDuration,
				submitForm: submitForm,
				tableData: tableData,
				deleteFlight: deleteFlight,
			}}
		>
			<FlightsView />
		</FlightsContext.Provider>
	);
};

export default Flights;
