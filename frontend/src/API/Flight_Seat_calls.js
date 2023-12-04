import axios from "axios";
const BASE_URL = "http://localhost:5000/flight_seats/";

export const add_flight_seat = async (requestObject) => {
	/*
		flightId
        planeSeatId
	*/
	const queryResult = await axios.post(
		BASE_URL + "add_flight_seat",
		requestObject
	);
	return queryResult.status === 200;
};

export const get_flight_seat = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_flight_seat", {
		params: requestObject,
	});
	return queryResult.data;
};

export const get_all_flight_seats = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_all_flight_seats", {
		params: requestObject,
	});
	return queryResult.data;
};

export const delete_flight_seat = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.post(
		BASE_URL + "delete_flight_seat",
		requestObject
	);
	return queryResult.status === 200;
};

export const get_flight_plane_seats = async (requestObject) => {
	/*
		id (flight id)
		planeId
	*/
	const queryResult = await axios.get(
		BASE_URL + "get_all_flight_seats_for_plane_flight",
		{
			params: requestObject,
		}
	);
	return queryResult.data;
};

export const get_flight_seat_info_for_cart = async (requestObject) => {
	/*
		flightSeats[] -> 	array of seats
							every seat: 
										flightId
										seatNum

	*/
	const queryResult = await axios.get(
		BASE_URL + "get_flight_seat_info_for_cart",
		{
			params: requestObject,
		}
	);
	return queryResult.data;
};

export const verifySeatEmpty = async (requestObject) => {
	/*
		flightId
        planeSeatId
	*/
	const queryResult = await axios.get(BASE_URL + "check_seat_available", {
		params: requestObject,
	});
	return queryResult.data.isAvailable;
};
