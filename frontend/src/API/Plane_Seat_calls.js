import axios from "axios";
const BASE_URL = "http://localhost:5000/plane_seats/";

export const add_plane_seat = async (requestObject) => {
	/*
	    password
		passport
		first_name
		last_name
	*/
	const queryResult = await axios.post(
		BASE_URL + "add_plane_seat",
		requestObject
	);
	return queryResult.status === 200;
};

export const get_plane_seat = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_plane_seat", {
		params: requestObject,
	});
	return queryResult.data;
};

export const get_all_plane_seats = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_all_plane_seats", {
		params: requestObject,
	});
	return queryResult.data;
};

export const delete_plane_seat = async (requestObject) => {
	/*
	    id (plane id)
	*/
	const queryResult = await axios.post(
		BASE_URL + "delete_plane_seat",
		requestObject
	);
	return queryResult.status === 200;
};

export const get_all_plane_seats_by_plane = async (requestObject) => {
	/*
	    id (plane id)
	*/
	const queryResult = await axios.get(BASE_URL + "get_plane_seats_by_plane", {
		params: requestObject,
	});
	return queryResult.data;
};

export const add_plane_seats_by_number = async (requestObject) => {
	/*
		planeId
		number
	*/
	const queryResult = await axios.post(
		BASE_URL + "add_plane_seats_by_number",
		requestObject
	);
	console.log("queryResult", queryResult);

	return queryResult.status === 200;
};
