import { Sequelize } from "sequelize";
import { ORM } from "../../DBConnectionModule.js";
const TABLE_NAME = "flights";

export const add_flight = async (requestObject) => {
	return await ORM.flights
		.create({
			planeId: requestObject.planeId,
			originId: requestObject.originId,
			destinationId: requestObject.destinationId,
			depart_time: requestObject.depart_time,
			price_usd: requestObject.price_usd,
			duration_minutes: requestObject.duration_minutes,
			date: requestObject.date,
		})
		.then(async (result) => {
			const added = await get_flight_by_id({ id: result.id });
			// const obj = new Plane(added);
			console.log(`ADDED TO ${TABLE_NAME}: ${added}`);
			return 200;
		})
		.catch((err) => console.log(err));
};

export const get_flight_by_id = async (requestObject) => {
	return await ORM.flights
		.findOne({
			where: { id: requestObject.id },
			raw: true,
		})
		.then((result) => {
			return result;
		})
		.catch((err) => console.log(err));
};

export const get_all_flights = async () => {
	return await ORM.flights.findAll({ raw: true });
};

export const delete_flight = async (requestObject) => {
	return await ORM.flights
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

export const delete_all_flights = async (requestObject) => {
	let all_records = await get_all_flights();
	await all_records.forEach(async (record) => {
		await delete_flight(record);
	});
};

export const get_all_flights_by_origin_destination = async (requestObject) => {
	let beginDate = new Date(requestObject.startDate);
	beginDate = new Date(beginDate - 86400000);
	let finishDate = new Date(requestObject.endDate);
	finishDate = new Date(finishDate + 86400000);
	const startPrice = parseInt(requestObject.startPrice) - 1;
	const endPrice = parseInt(requestObject.toPrice) + 1;
	return await ORM.flights
		.findAll({
			where: {
				originId: requestObject.originId,
				destinationId: requestObject.destinationId,
				date: {
					[Sequelize.Op.between]: [beginDate, finishDate],
				},
				price_usd: {
					[Sequelize.Op.between]: [
						requestObject.startPrice,
						requestObject.toPrice,
					],
				},
				// [Sequelize.Op.or]: [
				// 	{
				// 		// date: {
				// 		// 	[Sequelize.Op.between]: [
				// 		// 		requestObject.beginDate,
				// 		// 		requestObject.finishDate,
				// 		// 	],
				// 		// },
				// 	},
				// 	{
				// 		date: {
				// 			[Sequelize.Op.eq]: [requestObject.startDate],
				// 		},
				// 	},
				// 	{
				// 		date: {
				// 			[Sequelize.Op.eq]: [requestObject.endDate],
				// 		},
				// 	},
				// ],
			},
			raw: true,
		})
		.then((result) => {
			return result;
		})
		.catch((err) => console.log(err));
};
