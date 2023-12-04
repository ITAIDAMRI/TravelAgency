import { ORM } from "../../DBConnectionModule.js";
import Plane from "./Plane.js";
const TABLE_NAME = "PLANES";

export const add_Plane = async (requestObject) => {
	return await ORM.planes
		.create({
			model: requestObject.model,
			company: requestObject.company,
		})
		.then(async (result) => {
			const added = await get_plane_by_id({ id: result.id });
			const obj = new Plane(added);
			console.log(`ADDED TO ${TABLE_NAME}: ${obj}`);
			return 200;
		})
		.catch((err) => console.log(err));
};

export const get_plane_by_id = async (requestObject) => {
	return await ORM.planes
		.findOne({
			where: { id: requestObject.id },
			raw: true,
		})
		.then((result) => {
			return result;
		})
		.catch((err) => console.log(err));
};

export const get_all_Planes = async () => {
	return await ORM.planes.findAll({ raw: true });
};

export const delete_Plane = async (requestObject) => {
	console.log("requestObject", requestObject);
	return await ORM.planes
		.destroy({
			where: { id: requestObject.id },
		})
		.then((result) => {
			console.log("result", result);
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

export const delete_all_Planes = async (requestObject) => {
	let all_records = await get_all_Planes();
	await all_records.forEach(async (record) => {
		await delete_Plane(record);
	});
};
