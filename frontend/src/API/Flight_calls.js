import axios from "axios";
const BASE_URL = "http://localhost:5000/flights/";

export const add_flight = async (requestObject) => {
	/*
		planeId
        originId
        destinationId
		depart_time
		price_usd
		duration_minutes
		date
	*/
	const queryResult = await axios.post(BASE_URL + "add_flight", requestObject);
	return queryResult.status === 200;
};

export const get_flight = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_flight", {
		params: requestObject,
	});
	return queryResult.data;
};

export const get_all_flights = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_all_flights", {
		params: requestObject,
	});
	return queryResult.data;
};

export const delete_flight = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.post(
		BASE_URL + "delete_flight",
		requestObject
	);
	return queryResult.status === 200;
};

export const get_all_flights_by_origin_destination = async (requestObject) => {
	/*
		originId
		destinationId
	*/
	const queryResult = await axios.get(
		BASE_URL + "get_all_flights_bo_origin_destination",
		{
			params: requestObject,
		}
	);
	return queryResult.data;
};
