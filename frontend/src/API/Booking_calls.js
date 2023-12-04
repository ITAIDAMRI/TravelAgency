import axios from "axios";
const BASE_URL = "http://localhost:5000/bookings/";

export const add_booking = async (requestObject) => {
	/*
		booking_date
        userId
        flightSeatId
        paymentId
	*/
	const queryResult = await axios.post(BASE_URL + "add_booking", requestObject);
	return queryResult.status === 200;
};

export const get_booking = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_booking", {
		params: requestObject,
	});
	return queryResult.data;
};

export const get_all_bookings = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_all_bookings", {
		params: requestObject,
	});
	return queryResult.data;
};

export const delete_booking = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.post(
		BASE_URL + "delete_booking",
		requestObject
	);
	return queryResult.status === 200;
};
