import express from "express";
import {
	get_flight_seat_info_for_cart,
	get_request_all_flight_seats_by_flight,
	get_request_get_all_flight_seats,
	get_request_get_all_flight_seats_by_flight,
	get_request_get_flight_seat_by_id,
	get_request_is_seat_available,
	post_request_add_flight_seat,
} from "../database/DBConnectionModule.js";

const router = express.Router();

router.get("/get_flight_seat", async function (req, res) {
	const requestObject = {
		id: req.query.id,
	};
	const result = await get_request_get_flight_seat_by_id(requestObject);
	res.send(result);
});

router.post("/add_flight_seat", async function (req, res) {
	const requestObject = req.body;
	res.send(await post_request_add_flight_seat(requestObject));
});

router.get("/get_all_flight_seats", async function (req, res) {
	const requestObject = {};
	const result = await get_request_get_all_flight_seats(requestObject);
	res.send(result);
});

router.get("/get_all_flight_seats_by_flight", async function (req, res) {
	const requestObject = {};
	const result = await get_request_get_all_flight_seats_by_flight(
		requestObject
	);
	res.send(result);
});

router.get("/get_all_flight_seats_for_plane_flight", async function (req, res) {
	const requestObject = req.query;
	const result = await get_request_all_flight_seats_by_flight(requestObject);
	res.send(result);
});

router.get("/get_flight_seat_info_for_cart", async function (req, res) {
	const requestObject = req.query;
	if (requestObject.flight_seats == null) {
		res.sendStatus(200);
		return;
	}
	const result = await get_flight_seat_info_for_cart(requestObject);
	console.log("CART RESULT", result);
	res.send(result);
});

router.get("/check_seat_available", async function (req, res) {
	const requestObject = req.query;
	const result = await get_request_is_seat_available(requestObject);
	res.send({ isAvailable: result });
});

export default router;
