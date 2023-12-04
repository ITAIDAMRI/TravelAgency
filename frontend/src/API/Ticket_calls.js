import axios from "axios";
const BASE_URL = "http://localhost:5000/tickets/";

export const add_ticket = async (requestObject) => {
	/*
		bookingId
	*/
	const queryResult = await axios.post(BASE_URL + "add_ticket", requestObject);
	return queryResult.status === 200;
};

export const get_ticket = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_ticket", {
		params: requestObject,
	});
	return queryResult.data;
};

export const get_all_tickets = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_all_tickets", {
		params: requestObject,
	});
	return queryResult.data;
};

export const delete_ticket = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.post(
		BASE_URL + "delete_ticket",
		requestObject
	);
	return queryResult.status === 200;
};
