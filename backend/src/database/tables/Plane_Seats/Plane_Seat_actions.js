import { ORM } from "../../DBConnectionModule.js";
import plane_seat from "./Plane_Seat.js";
const TABLE_NAME = "plane_seats";

export const get_plane_seats_by_plane = async (requestObject) => {
	return await ORM.plane_seats.findAll({
		where: { planeId: requestObject.id },
		raw: true,
	});
};

export const add_plane_seats_by_number = async (requestObject) => {
	const number = requestObject.number;
	const lastSeat = await ORM.plane_seats.findOne({
		attributes: ["seatNum"],
		where: { planeId: requestObject.planeId },
		order: [["seatNum", "DESC"]],
		raw: true,
	});

	let lastSeatId = 0;
	if (lastSeat !== null) lastSeatId = lastSeat.seatNum;
	lastSeatId = parseInt(lastSeatId);
	const requestedNumber = parseInt(requestObject.number);
	const newSeats = [];
	for (let i = lastSeatId + 1; i <= lastSeatId + requestedNumber; i++) {
		await add_plane_seat({
			seatNum: i,
			planeId: requestObject.planeId,
		});
	}
};

export const add_plane_seat = async (requestObject) => {
	return await ORM.plane_seats
		.create({
			seatNum: requestObject.seatNum,
			planeId: requestObject.planeId,
		})
		.then(async (result) => {
			const added = await get_plane_seat_by_id({ id: result.id });
			const obj = new plane_seat(added);
			console.log(`ADDED TO ${TABLE_NAME}: ${obj}`);
			return 200;
		})
		.catch((err) => console.log(err));
};

export const get_plane_seat_by_id = async (requestObject) => {
	return await ORM.plane_seats
		.findOne({
			where: { id: requestObject.id },
			raw: true,
		})
		.then((result) => {
			return result;
		})
		.catch((err) => console.log(err));
};

export const get_all_plane_seats = async () => {
	return await ORM.plane_seats.findAll({ raw: true });
};

export const delete_plane_seat = async (requestObject) => {
	return await ORM.plane_seats
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

export const delete_all_plane_seats = async (requestObject) => {
	let all_records = await get_all_plane_seats();
	await all_records.forEach(async (record) => {
		await delete_plane_seat(record);
	});
};
