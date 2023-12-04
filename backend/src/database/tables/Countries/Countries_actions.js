import { ORM } from "../../DBConnectionModule.js";
const TABLE_NAME = "COUNTRIES";

export const add_country = async (requestObject) => {
	return await ORM.countries
		.create({
			name: requestObject.name,
		})
		.then(async (result) => {
			const added = await get_country_by_id({ id: result.id });
			// const obj = new Plane(added);
			console.log(`ADDED TO ${TABLE_NAME}: ${added}`);
			return 200;
		})
		.catch((err) => console.log(err));
};

export const get_country_by_id = async (requestObject) => {
	return await ORM.countries
		.findOne({
			where: { id: requestObject.id },
			raw: true,
		})
		.then((result) => {
			return result;
		})
		.catch((err) => console.log(err));
};

export const get_all_countries = async () => {
	return await ORM.countries.findAll({ raw: true });
};

export const delete_country = async (requestObject) => {
	return await ORM.countries
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

export const delete_all_countries = async (requestObject) => {
	let all_records = await get_all_countries();
	await all_records.forEach(async (record) => {
		await delete_country(record);
	});
};
