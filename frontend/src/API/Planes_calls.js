import axios from "axios";
const BASE_URL = "http://localhost:5000/planes/";

export const add_plane = async (requestObject) => {
	/*
		company
		model
	*/
	const queryResult = await axios.post(BASE_URL + "add_plane", requestObject);
	return queryResult.status === 200;
};

export const get_plane = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_plane", {
		params: requestObject,
	});
	return queryResult.data;
};

export const get_all_planes = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_all_planes", {
		params: requestObject,
	});
	return queryResult.data;
};

export const delete_plane = async (requestObject) => {
	const queryResult = await axios.post(
		BASE_URL + "delete_plane",
		requestObject
	);
	return queryResult.status === 200;
};
