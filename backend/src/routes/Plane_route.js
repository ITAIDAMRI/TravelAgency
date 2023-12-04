import express from "express";
import {
	get_request_get_all_planes,
	get_request_get_plane_by_id,
	post_request_add_plane,
	post_request_delete_plane,
} from "../database/DBConnectionModule.js";

const router = express.Router();

router.get("/get_plane", async function (req, res) {
	const requestObject = {
		id: req.query.id,
	};
	const result = await get_request_get_plane_by_id(requestObject);
	res.send(result);
});

router.post("/add_plane", async function (req, res) {
	const requestObject = req.body;
	res.send(await post_request_add_plane(requestObject));
});

router.post("/delete_plane", async function (req, res) {
	const requestObject = req.body;
	res.send(await post_request_delete_plane(requestObject));
});

router.get("/get_all_planes", async function (req, res) {
	const requestObject = {};
	const result = await get_request_get_all_planes(requestObject);
	res.send(result);
});

router.get("/get_plane", async function (req, res) {
	const requestObject = req.query;
	const result = await get_request_get_plane_by_id(requestObject);
	res.send(result);
});

export default router;
