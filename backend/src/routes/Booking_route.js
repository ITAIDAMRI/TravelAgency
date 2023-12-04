import express from "express";
import {
	get_request_get_all_bookings,
	get_request_get_booking,
	post_request_add_booking,
	post_request_delete_booking,
} from "../database/DBConnectionModule.js";

const router = express.Router();

router.get("/get_booking", async function (req, res) {
	const requestObject = {
		id: req.query.id,
	};
	const result = await get_request_get_booking(requestObject);
	res.send(result);
});

router.post("/add_booking", async function (req, res) {
	const requestObject = req.body;
	const result = await post_request_add_booking(requestObject);
	res.send(result);
});

router.post("/delete_booking", async function (req, res) {
	const requestObject = req.body;
	const result = await post_request_delete_booking(requestObject);
	res.send(result);
});

router.get("/get_all_bookings", async function (req, res) {
	const requestObject = {};
	const result = await get_request_get_all_bookings(requestObject);
	res.send(result);
});

router.get("/get_booking", async function (req, res) {
	const requestObject = req.query;
	const result = await get_request_get_booking(requestObject);
	res.send(result);
});

export default router;
