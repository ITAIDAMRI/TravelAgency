import { ORM } from "../../DBConnectionModule.js";
const TABLE_NAME = "bookings";

export const add_booking = async (requestObject) => {
	return await ORM.bookings
		.create({
			booking_date: requestObject.booking_date,
			userId: requestObject.userId,
			flightSeatId: requestObject.flightSeatId,
			paymentId: requestObject.paymentId,
		})
		.then(async (result) => {
			const added = await get_booking_by_id({ id: result.id });
			// const obj = new Plane(added);
			console.log(`ADDED TO ${TABLE_NAME}: ${added}`);
			return 200;
		})
		.catch((err) => console.log(err));
};

export const get_booking_by_id = async (requestObject) => {
	return await ORM.bookings
		.findOne({
			where: { id: requestObject.id },
			raw: true,
		})
		.then((result) => {
			return result;
		})
		.catch((err) => console.log(err));
};

export const get_all_bookings = async () => {
	return await ORM.bookings.findAll({ raw: true });
};

export const delete_booking = async (requestObject) => {
	return await ORM.bookings
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

export const delete_all_bookings = async (requestObject) => {
	let all_records = await get_all_bookings();
	await all_records.forEach(async (record) => {
		await delete_booking(record);
	});
};
