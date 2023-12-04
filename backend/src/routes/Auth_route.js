import express from "express";
import {
	get_request_authenticate_user,
	get_request_check_auth,
	post_request_delete_logged_in,
} from "../database/DBConnectionModule.js";
import { get_logged_in_by_user_id } from "../database/tables/Logged_In/Logged_In_actions.js";
const router = express.Router();

router.get("/auth", async function (req, res) {
	const requestObject = req.query;
	const result = await get_request_authenticate_user(requestObject);

	res.send({ user: result });
});

router.get("/auth/is_logged_in", async function (req, res) {
	const requestObject = req.query;
	const queryResult = await get_logged_in_by_user_id(requestObject);
	res.send({ loggedIn: queryResult !== null });
});

router.post("/auth/logout", async function (req, res) {
	const requestObject = req.query;
	return await post_request_delete_logged_in(requestObject);
});

router.get("/auth/checkAuth", async function (req, res) {
	const requestObject = req.query;
	return await get_request_check_auth(requestObject);
});

router.post("/auth/log_out", async function (req, res) {
	const requestObject = req.body;
	res.send(await post_request_delete_logged_in(requestObject));
});

export default router;
