import express from "express";
import {
	get_request_get_all_users,
	get_request_get_user,
	post_request_add_user,
} from "../database/DBConnectionModule.js";
import { delete_user } from "../database/tables/Users/Users_actions.js";
const router = express.Router();

router.get("/get_user", async function (req, res) {
	const requestObject = req.query;
	const result = await get_request_get_user(requestObject);
	res.send(result);
});

router.post("/add_user", async function (req, res) {
	const requestObject = req.body;
	requestObject.permission = 0;
	const result = await post_request_add_user(requestObject);
	res.send(result);
});

router.get("/get_all_users", async function (req, res) {
	const requestObject = {};
	const result = await get_request_get_all_users(requestObject);
	res.send(result);
});

router.post("/delete_user", async function (req, res) {
	const userObject = req.body;
	const result = await delete_user(requestObject);
});

export default router;
