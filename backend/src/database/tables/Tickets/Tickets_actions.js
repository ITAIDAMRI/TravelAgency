import { ORM } from "../../DBConnectionModule.js";
const TABLE_NAME = "tickets";

export const add_ticket = async (requestObject) => {
	return await ORM.tickets
		.create({
			bookingId: requestObject.bookingId,
		})
		.then(async (result) => {
			const added = await find_ticket_by_id({ id: result.id });
			// const obj = new Plane(added);
			console.log(`ADDED TO ${TABLE_NAME}: ${added}`);
			return 200;
		})
		.catch((err) => console.log(err));
};

export const get_ticket_by_id = async (requestObject) => {
	return await ORM.tickets
		.findOne({
			where: { id: requestObject.id },
			raw: true,
		})
		.then((result) => {
			return result;
		})
		.catch((err) => console.log(err));
};

export const get_all_tickets = async () => {
	return await ORM.tickets.findAll({ raw: true });
};

export const delete_ticket = async (requestObject) => {
	return await ORM.tickets
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

export const delete_all_tickets = async (requestObject) => {
	let all_records = await get_all_tickets();
	await all_records.forEach(async (record) => {
		await delete_ticket(record);
	});
};
