import axios from "axios";
const BASE_URL = "http://localhost:5000/countries/";

export const add_country = async (requestObject) => {
	/*
        name
	*/
	const queryResult = await axios.post(BASE_URL + "add_country", requestObject);
	return queryResult.status === 200;
};

export const get_country = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_country", {
		params: requestObject,
	});
	return queryResult.data;
};

export const get_all_countries = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_all_countries", {
		params: requestObject,
	});
	return queryResult.data;
};

export const delete_country = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.post(
		BASE_URL + "delete_country",
		requestObject
	);
	return queryResult.status === 200;
};
