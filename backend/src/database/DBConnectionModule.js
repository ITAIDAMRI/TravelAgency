import { setup_database } from "./setup/setupDB.js";
import { setup_ORM } from "./setup/setupORM.js";
import {
	add_booking,
	delete_booking,
	delete_all_bookings,
	get_all_bookings,
	get_booking_by_id,
} from "./tables/Bookings/Booking_actions.js";
import {
	add_country,
	get_country_by_id,
	get_all_countries,
	delete_country,
} from "./tables/Countries/Countries_actions.js";
import {
	add_flight_seat,
	delete_flight_seat,
	get_all_flight_seats,
	get_flight_seat_by_flight_id as get_flight_seats_by_flight_id,
	get_flight_seat_by_id,
	get_flight_seat_by_planeSeatId,
	isWritingAvailable,
	setWritingAvailable,
} from "./tables/Flight_Seats/Flight_Seat_actions.js";
import {
	add_flight,
	delete_flight,
	get_all_flights,
	get_all_flights_by_origin_destination,
	get_flight_by_id,
} from "./tables/Flights/Flights_actions.js";
import {
	add_logged_in,
	check_auth,
	delete_logged_in_by_user,
	get_logged_in_by_user_id,
} from "./tables/Logged_In/Logged_In_actions.js";
import {
	add_payment,
	delete_payment,
	get_all_payments,
	get_payment_by_id,
} from "./tables/Payments/Payments_actions.js";
import {
	add_plane_seat,
	add_plane_seats_by_number,
	delete_plane_seat,
	get_plane_seat_by_id,
	get_plane_seats_by_plane,
} from "./tables/Plane_Seats/Plane_Seat_actions.js";
import {
	add_Plane,
	delete_Plane,
	get_all_Planes,
	get_plane_by_id,
} from "./tables/Planes/Planes_actions.js";
import {
	add_ticket,
	delete_ticket,
	get_all_tickets,
	get_ticket_by_id,
} from "./tables/Tickets/Tickets_actions.js";
import {
	add_user,
	delete_user,
	delete_all_users,
	find_user_by_id,
	get_all_users,
	authenticate_user,
} from "./tables/Users/Users_actions.js";

export let ORM;

export const createDBConnection = async () => {
	await setup_database();
	ORM = await setup_ORM();
	// await testFunc();
	await add_default_values();
	// await delete_all_Users();
};

export const add_default_values = async () => {
	// ADDING PLANES
	await post_request_add_plane({ model: "747", company: "Boing" });
	await post_request_add_plane({ model: "777", company: "Airbus" });
	await post_request_add_plane({ model: "645", company: "URAL Airlines" });
	await post_request_add_plane({ model: "Arrow-12", company: "Elbit" });
	await post_request_add_plane({ model: "FOG-643", company: "Boing" });
	await post_request_add_plane({ model: "X-WING 3000", company: "Apache" });

	// ADDING PLANE SEATS
	await post_request_add_plane_seats_by_number({ planeId: 1, number: 30 });
	await post_request_add_plane_seats_by_number({ planeId: 2, number: 30 });
	await post_request_add_plane_seats_by_number({ planeId: 3, number: 30 });
	await post_request_add_plane_seats_by_number({ planeId: 4, number: 30 });
	await post_request_add_plane_seats_by_number({ planeId: 5, number: 30 });
	await post_request_add_plane_seats_by_number({ planeId: 6, number: 30 });

	// ADDING USERS
	await post_request_add_user({
		password: "1234",
		first_name: "John",
		last_name: "Doe",
		passport: "123",
		permission: "0",
	});
	await post_request_add_user({
		password: "admin",
		first_name: "admin",
		last_name: "admin",
		passport: "admin",
		permission: "0",
	});

	// ADDING COUNTRIES
	await post_request_add_country({ name: "Israel" });
	await post_request_add_country({ name: "Turkey" });
	await post_request_add_country({ name: "Egypt" });
	await post_request_add_country({ name: "USA" });
	await post_request_add_country({ name: "Canada" });
	await post_request_add_country({ name: "Italy" });
	await post_request_add_country({ name: "Czech Republic" });
	await post_request_add_country({ name: "Germany" });
	await post_request_add_country({ name: "Spain" });
	await post_request_add_country({ name: "Austria" });

	// ADDING FLIGHTS
	await post_request_add_flight({
		originId: 1,
		destinationId: 2,
		depart_time: "17:00",
		price_usd: 100,
		duration_minutes: 100,
		date: "2023-01-20",
		planeId: 1,
	});

	await post_request_add_flight({
		originId: 1,
		destinationId: 2,
		depart_time: "17:00",
		price_usd: 75,
		duration_minutes: 100,
		date: "2023-01-20",
		planeId: 6,
	});

	await post_request_add_flight({
		originId: 1,
		destinationId: 2,
		depart_time: "01:00",
		price_usd: 75,
		duration_minutes: 100,
		date: "2023-01-20",
		planeId: 6,
	});

	await post_request_add_flight({
		originId: 2,
		destinationId: 1,
		depart_time: "13:00",
		price_usd: 100,
		duration_minutes: 100,
		date: "2023-01-21",
		planeId: 1,
	});

	await post_request_add_flight({
		originId: 1,
		destinationId: 2,
		depart_time: "17:00",
		price_usd: 100,
		duration_minutes: 100,
		date: "2023-01-20",
		planeId: 1,
	});

	await post_request_add_flight({
		originId: 1,
		destinationId: 3,
		depart_time: "14:00",
		price_usd: 150,
		duration_minutes: 100,
		date: "2023-01-19",
		planeId: 2,
	});

	await post_request_add_flight({
		originId: 3,
		destinationId: 1,
		depart_time: "14:00",
		price_usd: 150,
		duration_minutes: 100,
		date: "2023-01-20",
		planeId: 2,
	});

	await post_request_add_flight({
		originId: 2,
		destinationId: 3,
		depart_time: "11:00",
		price_usd: 200,
		duration_minutes: 100,
		date: "2023-01-19",
		planeId: 4,
	});

	await post_request_add_flight({
		originId: 3,
		destinationId: 2,
		depart_time: "17:00",
		price_usd: 200,
		duration_minutes: 100,
		date: "2023-01-20",
		planeId: 4,
	});

	await post_request_add_flight({
		originId: 2,
		destinationId: 4,
		depart_time: "10:00",
		price_usd: 250,
		duration_minutes: 100,
		date: "2023-01-21",
		planeId: 4,
	});

	await post_request_add_flight({
		originId: 2,
		destinationId: 1,
		depart_time: "10:00",
		price_usd: 50,
		duration_minutes: 100,
		date: "2023-01-20",
		planeId: 1,
	});
};

/////	Logging In //////////////////////////////////////////////
export const get_request_logged_in_by_user = async (requestObject) => {
	const result = await get_logged_in_by_user_id(requestObject);
	return result === 200;
};

export const get_request_authenticate_user = async (requestObject) => {
	const authResult = await authenticate_user(requestObject);
	if (!authResult) return authResult;
	const token = await add_logged_in(authResult);
	authResult.token = token;
	return authResult;
};

export const post_request_delete_logged_in = async (requestObject) => {
	return await delete_logged_in_by_user(requestObject);
};

export const get_request_check_auth = async (requestObject) => {
	return await check_auth(requestObject);
};

/////	Users //////////////////////////////////////////////
export const get_request_get_user = async (requestObject) => {
	const queryResult = await find_user_by_id(requestObject);
	console.log("queryResult", queryResult);
	return queryResult;
};

export const post_request_add_user = async (requestObject) => {
	const queryResult = await add_user(requestObject);
	console.log("queryResult", queryResult);
	return queryResult;
};

export const get_request_get_all_users = async () => {
	return await get_all_users(requestObject);
};

export const post_request_delete_user = async (requestObject) => {
	return await delete_user(requestObject);
};

/////	Planes //////////////////////////////////////////////
export const post_request_add_plane = async (requestObject) => {
	const result = await add_Plane(requestObject);
	return result;
};

export const get_request_get_plane_by_id = async (requestObject) => {
	const queryResult = await get_plane_by_id(requestObject);
	return queryResult;
};
export const get_request_get_all_planes = async (requestObject) => {
	return await get_all_Planes(requestObject);
};

export const post_request_delete_plane = async (requestObject) => {
	return await delete_Plane(requestObject);
};

/////	Plane Seats //////////////////////////////////////////////
export const post_request_add_plane_seat = async (requestObject) => {
	const queryResult = await add_plane_seat(requestObject);
	return queryResult;
};

export const get_request_get_plane_seats_by_plane = async (requestObject) => {
	return await get_plane_seats_by_plane(requestObject);
};

export const get_request_get_plane_seat = async (requestObject) => {
	return await get_plane_seat_by_id(requestObject);
};

export const post_request_delete_plane_seat = async (requestObject) => {
	return await delete_plane_seat(requestObject);
};

export const post_request_add_plane_seats_by_number = async (requestObject) => {
	return await add_plane_seats_by_number(requestObject);
};

/////	Bookings //////////////////////////////////////////////
export const post_request_add_booking = async (requestObject) => {
	return await add_booking(requestObject);
};

export const get_request_get_booking = async (requestObject) => {
	return await get_booking_by_id(requestObject);
};

export const get_request_get_all_bookings = async (requestObject) => {
	return await get_all_bookings(requestObject);
};

export const post_request_delete_booking = async (requestObject) => {
	return await delete_booking(requestObject);
};

export const post_request_delete_all_bookings = async (requestObject) => {
	return await delete_all_bookings(requestObject);
};

/////	Countries //////////////////////////////////////////////
export const post_request_add_country = async (requestObject) => {
	return await add_country(requestObject);
};

export const get_request_get_country = async (requestObject) => {
	return await get_country_by_id(requestObject);
};

export const get_request_get_all_countries = async (requestObject) => {
	return await get_all_countries(requestObject);
};

export const post_request_delete_country = async (requestObject) => {
	return await delete_country(requestObject);
};

/////	Flights //////////////////////////////////////////////

export const post_request_add_flight = async (requestObject) => {
	return await add_flight(requestObject);
};

export const get_request_get_flight = async (requestObject) => {
	return await get_flight_by_id(requestObject);
};

export const get_request_get_all_flights = async (requestObject) => {
	return await get_all_flights(requestObject);
};

export const post_request_delete_flight = async (requestObject) => {
	return await delete_flight(requestObject);
};

export const get_request_get_all_flights_by_origin_destination = async (
	requestObject
) => {
	return await get_all_flights_by_origin_destination(requestObject);
};

/////	Flight_Seats //////////////////////////////////////////////
export const post_request_add_flight_seat = async (requestObject) => {
	if (!isWritingAvailable) return 208;
	setWritingAvailable(false);
	const queryResult = await add_flight_seat(requestObject);
	setWritingAvailable(true);
	return queryResult;
};
export const get_request_get_flight_seat_by_id = async (requestObject) => {
	return await get_flight_seat_by_id(requestObject);
};

export const get_request_get_all_flight_seats = async (requestObject) => {
	return await get_all_flight_seats(requestObject);
};

export const get_request_get_all_flight_seats_by_flight = async (
	requestObject
) => {
	return await get_flight_seats_by_flight_id(requestObject);
};

export const post_request_delete_flight_seat = async (requestObject) => {
	return await delete_flight_seat(requestObject);
};

export const get_request_all_flight_seats_by_flight = async (requestObject) => {
	const planeSeats = await get_plane_seats_by_plane({
		id: requestObject.planeId,
	});
	const resultSeats = [];
	for (const planeSeat of planeSeats) {
		const resultSeatObj = planeSeat;
		if (
			(await get_flight_seat_by_planeSeatId({
				planeSeatId: planeSeat.id,
				flightId: requestObject.id,
			})) !== null
		)
			resultSeatObj.occupied = true;
		else resultSeatObj.occupied = false;
		resultSeatObj.flightId = requestObject.id;
		resultSeats.push(resultSeatObj);
	}
	return resultSeats;
};

export const get_flight_seat_info_for_cart = async (requestObject) => {
	const resultArr = [];
	for (const flightSeat of requestObject.flight_seats) {
		const flight = await get_flight_by_id({ id: flightSeat.flightId });
		console.log("flight", flight);
		const origin = await get_country_by_id({ id: flight.originId });
		const destination = await get_country_by_id({ id: flight.destinationId });
		const plane = await get_plane_by_id({ id: flight.planeId });
		const recordOBj = {
			planeId: flight.planeId,
			planeName: plane.company + " " + plane.model,
			seatNum: flightSeat.seatNum,
			flightId: flight.id,
			origin: origin.name,
			destination: destination.name,
			depart: flight.depart_time,
			price_usd: flight.price_usd,
			date: flight.date,
		};

		resultArr.push(recordOBj);
	}
	return resultArr;
};

export const get_request_is_seat_available = async (requestObject) => {
	const queryResult = await get_flight_seat_by_planeSeatId(requestObject);
	return queryResult == null;
};

/////	Tickets //////////////////////////////////////////////
export const post_request_add_ticket = async (requestObject) => {
	return await add_ticket(requestObject);
};

export const get_request_get_all_tickets = async (requestObject) => {
	return await get_all_tickets(requestObject);
};

export const get_request_get_ticket = async (requestObject) => {
	return await get_ticket_by_id(requestObject);
};

export const post_request_delete_ticket = async (requestObject) => {
	return await delete_ticket(requestObject);
};
/////	Payments //////////////////////////////////////////////

export const post_request_add_payment = async (requestObject) => {
	return await add_payment(requestObject);
};

export const get_request_get_all_payments = async (requestObject) => {
	return await get_all_payments(requestObject);
};

export const get_request_get_payment = async (requestObject) => {
	return await get_payment_by_id(requestObject);
};

export const post_request_delete_payment = async (requestObject) => {
	return await delete_payment(requestObject);
};
///////////////////////////////////////////////////////////////////////

const testFunc = async () => {};
