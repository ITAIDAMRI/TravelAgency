import express from "express";
import {
	get_request_get_all_tickets,
	get_request_get_ticket,
	post_request_add_ticket,
} from "../database/DBConnectionModule.js";

const router = express.Router();

router.get("/get_ticket", async function (req, res) {
	const requestObject = {
		id: req.query.id,
	};
	const result = await get_request_get_ticket(requestObject);
	res.send(result);
});

router.post("/add_ticket", async function (req, res) {
	const requestObject = req.body;
	res.send(await post_request_add_ticket(requestObject));
});

router.get("/get_all_tickets", async function (req, res) {
	const requestObject = {};
	const result = await get_request_get_all_tickets(requestObject);
	res.send(result);
});

router.get("/get_ticket", async function (req, res) {
	const requestObject = req.query;
	const result = await get_request_get_ticket_by_id(requestObject);
	res.send(result);
});

export default router;
