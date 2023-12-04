import { ORM } from "../../DBConnectionModule.js";
const TABLE_NAME = "flight_seatS";

let writing_available = true;

export const setWritingAvailable = (value) => {
	writing_available = value;
};

export const isWritingAvailable = () => {
	return writing_available;
};

const isSeatTaken = async (requestObject) => {
	const result = await ORM.flight_seats
		.findOne({
			where: {
				flightId: requestObject.flightId,
				planeSeatId: requestObject.planeSeatId,
			},
		})
		.then(async (result) => {
			console.log(`SEAT ALREADY TAKEN`);
			return result;
		})
		.catch((err) => console.log(err));
	console.log("result", result);
	console.log("result !== null", result !== null);
	return result !== null;
};

export const add_flight_seat = async (requestObject) => {
	if (await isSeatTaken(requestObject)) {
		console.log("return 208;");
		return 208;
	}
	return await ORM.flight_seats
		.create({
			occupied: true,
			flightId: requestObject.flightId,
			planeSeatId: requestObject.planeSeatId,
		})
		.then(async (result) => {
			const added = await get_flight_seat_by_id({ id: result.id });
			// const obj = new Plane(added);
			console.log(`ADDED TO ${TABLE_NAME}: ${added}`);
			return 200;
		})
		.catch((err) => console.log(err));
};

export const get_flight_seat_by_id = async (requestObject) => {
	return await ORM.flight_seats
		.findOne({
			where: { id: requestObject.id },
			raw: true,
		})
		.then((result) => {
			return result;
		})
		.catch((err) => console.log(err));
};

export const get_flight_seat_by_flight_id = async (requestObject) => {
	return await ORM.flight_seats
		.findOne({
			where: { flightId: requestObject.flightId },
			raw: true,
		})
		.then((result) => {
			return result;
		})
		.catch((err) => console.log(err));
};

export const get_all_flight_seats = async () => {
	return await ORM.flight_seats.findAll({ raw: true });
};

export const delete_flight_seat = async (requestObject) => {
	return await ORM.flight_seats
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

export const delete_all_flight_seats = async (requestObject) => {
	let all_records = await get_all_flight_seats();
	await all_records.forEach(async (record) => {
		await delete_flight_seat(record);
	});
};

export const get_flight_seat_by_planeSeatId = async (requestObject) => {
	return await ORM.flight_seats
		.findOne({
			where: {
				planeSeatId: requestObject.planeSeatId,
				flightId: requestObject.flightId,
			},
			raw: true,
		})
		.then((result) => {
			return result;
		})
		.catch((err) => console.log(err));
};
