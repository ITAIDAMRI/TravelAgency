import axios from "axios";
const BASE_URL = "http://localhost:5000/payments/";

export const add_payment = async (requestObject) => {
	/*
        userId
        creditor_first_name
        creditor_last_name
        creditor_id
        amount
        date
        time
	*/
	const queryResult = await axios.post(BASE_URL + "add_payment", requestObject);
	console.log("queryResult", queryResult);
	return queryResult.status === 200;
};

export const get_payment = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_payment", {
		params: requestObject,
	});
	return queryResult.data;
};

export const get_all_payments = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.get(BASE_URL + "get_all_payments", {
		params: requestObject,
	});
	return queryResult.data;
};

export const delete_payment = async (requestObject) => {
	/*
	    id
	*/
	const queryResult = await axios.post(
		BASE_URL + "delete_payment",
		requestObject
	);
	return queryResult.status === 200;
};
