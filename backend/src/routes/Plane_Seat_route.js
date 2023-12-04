import express from "express";
import {
	get_request_get_all_planes,
	get_request_get_plane_seat,
	get_request_get_plane_seats_by_plane,
	post_request_add_plane,
	post_request_add_plane_seat,
	post_request_add_plane_seats_by_number,
	post_request_delete_plane_seat,
} from "../database/DBConnectionModule.js";
import { get_plane_seats_by_plane } from "../database/tables/Plane_Seats/Plane_Seat_actions.js";

const router = express.Router();

router.get("/get_plane_seat", async function (req, res) {
	const requestObject = req.query;
	const result = await get_request_get_plane_seat(requestObject);
	res.send(result);
});

router.get("/get_plane_seats_by_plane", async function (req, res) {
	const requestObject = req.query;
	const result = await get_plane_seats_by_plane(requestObject);
	res.send(result);
});

router.post("/add_plane_seat", async function (req, res) {
	const requestObject = req.body;
	console.log("req.body", req.body);

	res.send(await post_request_add_plane_seat(requestObject));
});

router.post("/delete_plane_seat", async function (req, res) {
	const requestObject = req.body;
	console.log("req.body", req.body);

	res.send(await post_request_delete_plane_seat(requestObject));
});

router.get("/get_all_planes", async function (req, res) {
	const requestObject = {};
	const result = await get_request_get_all_planes(requestObject);
	res.send(result);
});

router.post("/add_plane_seats_by_number", async function (req, res) {
	const requestObject = req.body;
	res.send(await post_request_add_plane_seats_by_number(requestObject));
});

export default router;
