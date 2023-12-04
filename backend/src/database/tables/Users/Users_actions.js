import { ORM } from "../../DBConnectionModule.js";
import User from "./User.js";
const TABLE_NAME = "USERS";

export const add_user = async (requestObject) => {
	return await ORM.users
		.create({
			password: requestObject.password,
			passport: requestObject.passport,
			first_name: requestObject.first_name,
			last_name: requestObject.last_name,
			permission: requestObject.permission,
		})
		.then(async (result) => {
			const added_user = await find_user_by_id({ id: result.id });
			const user_obj = new User(added_user);
			console.log(`ADDED TO ${TABLE_NAME}: ${user_obj}`);
			return 200;
		})
		.catch((err) => console.log(err));
};

export const find_user_by_id = async (requestObject) => {
	return await ORM.users
		.findOne({
			where: { id: requestObject.id },
			raw: true,
		})
		.then((result) => {
			return result;
		})
		.catch((err) => console.log(err));
};

export const get_all_users = async () => {
	return await ORM.users.findAll({ raw: true });
};

export const delete_user = async (requestObject) => {
	return await ORM.users
		.destroy({
			where: { id: requestObject.id },
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

export const delete_all_users = async (requestObject) => {
	let all_users = await get_all_users();
	await all_users.forEach(async (element) => {
		await delete_user(element);
	});
};

export const authenticate_user = async (requestObject) => {
	return await ORM.users
		.findOne({
			where: {
				passport: requestObject.passport,
				password: requestObject.password,
			},
			raw: true,
		})
		.then((result) => {
			return result;
		})
		.catch((err) => console.log(err));
};
