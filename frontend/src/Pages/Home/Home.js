import React, { useContext, useEffect, useState } from "react";
import HomeView from "./HomeView";
import { HomeContext } from "./HomeContext";
import { get_all_countries } from "../../API/Country_calls";
import { get_all_flights_by_origin_destination } from "../../API/Flight_calls";
import {
	add_flight_seat,
	get_flight_plane_seats,
} from "../../API/Flight_Seat_calls";
import { AppStateContext } from "../../AppUtils/AppStateContext";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../appState/cartSlice";

export default function Home() {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const [countries, setCountries] = useState([]);
	const [flights, setFlights] = useState([]);
	const [planeFlightSeats, setPlaneFlightSeats] = useState([]);
	const [origin, setOrigin] = useState(null);
	const [destination, setDestination] = useState(null);
	const [flight, setFlight] = useState(null);
	const chooseSeat = (seat) => {};
	const context = useContext(AppStateContext);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [startPrice, setStartPrice] = useState("");
	const [toPrice, setToPrice] = useState("");

	const onPageStart = async () => {
		await context.validateUserLoggedIn();
	};

	const refreshCountries = async () => {
		setCountries(await get_all_countries({}));
	};

	const refreshFlights = async () => {
		if (origin !== null && destination !== null) {
			setFlights(
				await get_all_flights_by_origin_destination({
					originId: origin.id,
					destinationId: destination.id,
					startDate: startDate,
					endDate: endDate,
					startPrice: startPrice,
					toPrice: toPrice,
				})
			);
		}
	};

	const refreshFlightSeats = async () => {
		if (flight === null) return;
		const dbFlightSeats = await get_flight_plane_seats(flight);
		if (cart.items.length == 0) setPlaneFlightSeats(dbFlightSeats);
		else {
			for (const cartSeat of cart.items) {
				for (let i = 0; i < dbFlightSeats.length; i++) {
					if (cartSeat.id === dbFlightSeats[i].id) {
						dbFlightSeats[i].occupied = true;
					}
				}
			}
			setPlaneFlightSeats(dbFlightSeats);
		}
	};

	const reserveSeat = async (requestObject) => {
		dispatch(addItem(requestObject));
	};

	useEffect(() => {
		refreshFlightSeats();
	}, [cart]);

	useEffect(() => {
		onPageStart();
		refreshCountries();
	}, []);

	// useEffect(() => {
	// 	// refreshFlights();
	// }, [origin, destination]);

	useEffect(() => {
		refreshFlightSeats();
	}, [flights]);

	useEffect(() => {
		refreshFlightSeats();
	}, [flight]);

	// useEffect(() => {

	// }, [startDate, endDate]);

	const searchFlights = () => {
		if (
			startDate != "" &&
			startDate != "" &&
			origin != null &&
			destination != null
		) {
			refreshFlights();
		}
	};

	return (
		<HomeContext.Provider
			value={{
				countries: countries,
				setCountries: setCountries,
				flights: flights,
				setPlaneFlightSeats: setPlaneFlightSeats,
				origin: origin,
				destination: destination,
				setOrigin: setOrigin,
				setDestination: setDestination,
				chooseSeat: chooseSeat,
				setFlight: setFlight,
				planeFlightSeats: planeFlightSeats,
				reserveSeat: reserveSeat,
				setStartDate: setStartDate,
				setEndDate: setEndDate,
				searchFlights: searchFlights,
				setFromPrice: setStartPrice,
				setToPrice: setToPrice,
			}}
		>
			<HomeView />
		</HomeContext.Provider>
	);
}
