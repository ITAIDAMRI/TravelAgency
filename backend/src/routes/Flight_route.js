import express from "express";
import {
	get_request_get_all_flights,
	get_request_get_flight,
	post_request_add_flight,
	post_request_delete_flight,
} from "../database/DBConnectionModule.js";
import { get_all_flights_by_origin_destination } from "../database/tables/Flights/Flights_actions.js";

const router = express.Router();

router.get("/get_flight", async function (req, res) {
	const requestObject = {
		id: req.query.id,
	};
	const result = await get_request_get_flight(requestObject);
	res.send(result);
});

router.post("/add_flight", async function (req, res) {
	const requestObject = req.body;
	const result = await post_request_add_flight(requestObject);
	res.send(result);
});

router.get("/get_all_flights", async function (req, res) {
	const requestObject = {};
	const result = await get_request_get_all_flights(requestObject);
	res.send(result);
});

router.get("/get_flight", async function (req, res) {
	const requestObject = req.query;
	const result = await get_request_get_flight(requestObject);
	res.send(result);
});

router.get("/get_all_flights_bo_origin_destination", async function (req, res) {
	const requestObject = req.query;
	const result = await get_all_flights_by_origin_destination(requestObject);
	console.log("result", result);
	res.send(result);
});

router.post("/delete_flight", async function (req, res) {
	const requestObject = req.body;
	const result = await post_request_delete_flight(requestObject);
	res.send(result);
});

export default router;
