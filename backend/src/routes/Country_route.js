import express from "express";
import {
	get_request_get_all_countries,
	get_request_get_country,
	post_request_add_country,
	post_request_delete_country,
} from "../database/DBConnectionModule.js";

const router = express.Router();

router.get("/get_country", async function (req, res) {
	const requestObject = {
		id: req.query.id,
	};
	const result = await get_request_get_country(requestObject);
	res.send(result);
});

router.post("/add_country", async function (req, res) {
	const requestObject = req.body;
	const result = await post_request_add_country(requestObject);
	res.send(result);
});

router.post("/delete_country", async function (req, res) {
	const requestObject = req.body;
	const result = await post_request_delete_country(requestObject);
	res.send(result);
});

router.get("/get_all_countries", async function (req, res) {
	const requestObject = {};
	const result = await get_request_get_all_countries(requestObject);
	res.send(result);
});

router.get("/get_country", async function (req, res) {
	const requestObject = req.query;
	const result = await get_request_get_country(requestObject);
	res.send(result);
});

export default router;
