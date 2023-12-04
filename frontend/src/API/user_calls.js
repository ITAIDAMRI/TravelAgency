import axios from "axios";
const BASE_URL = "http://localhost:5000/users/";

export const add_user = async (requestObject) => {
	/*
	    password
		passport
		first_name
		last_name
	*/
	const queryResult = await axios.post(BASE_URL + "add_user", requestObject);
	return queryResult.status === 200;
};

export const get_user = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_user", {
		params: requestObject,
	});
	return queryResult.data;
};

export const get_all_users = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_all_users", {
		params: requestObject,
	});
	return queryResult.data;
};

export const delete_user = async (requestObject) => {
	const queryResult = await axios.post(BASE_URL + "delete_user", requestObject);
	return queryResult.status === 200;
};

export const login = async (requestObject) => {
	/*
		username
		passport
	*/
	const queryResult = await axios.get(BASE_URL + "auth", {
		params: requestObject,
	});
	return queryResult.data;
};

export const checkLoggedIn = async (requestObject) => {
	/*
		id
		token
	*/
	const queryResult = await axios.get(BASE_URL + "auth/is_logged_in", {
		params: requestObject,
	});
	return queryResult.data;
};

export const log_out = async (requestObject) => {
	/*
		id (user id)
	*/
	const queryResult = await axios.post(
		BASE_URL + "/auth/log_out",
		requestObject
	);
	console.log("queryResult", queryResult);
	return queryResult.status === 200;
};
