import express from "express";
import {
	get_request_get_all_payments,
	get_request_get_payment,
	post_request_add_payment,
} from "../database/DBConnectionModule.js";

const router = express.Router();

router.get("/get_payment", async function (req, res) {
	const requestObject = {
		id: req.query.id,
	};
	const result = await get_request_get_payment(requestObject);
	res.send(result);
});

router.post("/add_payment", async function (req, res) {
	const requestObject = req.body;
	console.log("requestObject", requestObject);
	const result = await post_request_add_payment(requestObject);
	res.send(result);
});

router.get("/get_all_payments", async function (req, res) {
	const requestObject = {};
	const result = await get_request_get_all_payments(requestObject);
	res.send(result);
});

router.get("/get_payment", async function (req, res) {
	const requestObject = req.query;
	const result = await get_request_get_payment(requestObject);
	res.send(result);
});

export default router;
