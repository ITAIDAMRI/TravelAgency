import { ORM } from "../../DBConnectionModule.js";
import { createToken } from "../../TokenService.js";
const TABLE_NAME = "logged_in";

export const get_logged_in_by_user_id = async (requestObject) => {
	console.log("requestObject", requestObject);
	return await ORM.logged_in
		.findOne({
			where: { userId: requestObject.id },
			raw: true,
		})
		.then((result) => {
			return result;
		})
		.catch((err) => console.log(err));
};

export const add_logged_in = async (requestObject) => {
	const loggedInObj = await get_logged_in_by_user_id(requestObject);
	if (loggedInObj !== null) return 208;
	const userToken = await createToken(requestObject);
	return await ORM.logged_in
		.create({
			userId: requestObject.id,
			token: userToken,
		})
		.then(async (result) => {
			const added = await get_logged_in_by_id({ id: result.id });
			console.log(`ADDED TO ${TABLE_NAME}: ${added}`);
			return result.token;
		})
		.catch((err) => console.log(err));
};

export const get_logged_in_by_id = async (requestObject) => {
	return await ORM.logged_in
		.findOne({
			where: { id: requestObject.id },
			raw: true,
		})
		.then((result) => {
			return result;
		})
		.catch((err) => console.log(err));
};

export const get_all_logged_in = async () => {
	return await ORM.logged_in.findAll({ raw: true });
};

export const delete_logged_in_by_user = async (requestObject) => {
	return await ORM.logged_in
		.destroy({
			where: { userId: requestObject.id },
		})
		.then((result) => {
			if (result == 1) {
				console.log(`DELETED FROM ${TABLE_NAME} ${requestObject.id}`);
				return 200;
			} else {
				console.log(
					`IN TABLE ${TABLE_NAME} RECORD ${requestObject.id} DOES NOT EXIST`
				);
				return 404;
			}
		})
		.catch((err) => console.log(err));
};

export const delete_all_logged_ins = async (requestObject) => {
	let all_records = await get_all_logged_in();
	await all_records.forEach(async (record) => {
		await delete_logged_in(record);
	});
};

export const get_all_logged_ins_by_origin_destination = async (
	requestObject
) => {
	return await ORM.logged_in
		.findAll({
			where: {
				originId: requestObject.originId,
				destinationId: requestObject.destinationId,
			},
			raw: true,
		})
		.then((result) => {
			return result;
		})
		.catch((err) => console.log(err));
};

export const check_auth = async (requestObject) => {
	if (requestObject.token === undefined) return null;
	return await ORM.logged_in
		.findOne({
			where: {
				userId: requestObject.id,
				token: requestObject.token,
			},
		})
		.then((result) => {
			return result;
		})
		.catch((err) => console.log(err));
};
