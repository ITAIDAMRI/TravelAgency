import { Sequelize } from "sequelize";
import { DATABASE_NAME } from "./setupDB.js";
import Users_scheme from "../tables/Users/Users_scheme.js";
import Flights_scheme from "../tables/Flights/Flights_scheme.js";
import Flight_Seats_scheme from "../tables/Flight_Seats/Flight_Seats_scheme.js";
import Planes_scheme from "../tables/Planes/Planes_scheme.js";
import Plane_Seats_scheme from "../tables/Plane_Seats/Plane_Seats_scheme.js";
import Bookings_scheme from "../tables/Bookings/Bookings_scheme.js";
import Tickets_scheme from "../tables/Tickets/Tickets_scheme.js";
import Payments_scheme from "../tables/Payments/Payments_scheme.js";
import Countries_scheme from "../tables/Countries/Countries_scheme.js";
import Logged_In_scheme from "../tables/Logged_In/Logged_In_scheme.js";

const connectDB = async () => {
	return await new Sequelize(DATABASE_NAME, "root", "", {
		dialect: "mysql",
		host: "localhost",
		logging: false,
	});
};

export const setup_ORM = async () => {
	const dbConnection = await connectDB();
	const ORM_OBJ = await define_ORM_tables(dbConnection);
	return ORM_OBJ;
};

const define_ORM_tables = async (dbConnection) => {
	console.log("===========================================================");
	console.log("SETTING UP ORM TABLE CONNECTIONS...");

	const logged_in = await connectTable(
		"logged_in",
		Logged_In_scheme,
		dbConnection
	);
	const users = await connectTable("users", Users_scheme, dbConnection);
	const countries = await connectTable(
		"countries",
		Countries_scheme,
		dbConnection
	);
	const planes = await connectTable("planes", Planes_scheme, dbConnection);
	const plane_seats = await connectTable(
		"plane_seats",
		Plane_Seats_scheme,
		dbConnection
	);
	const flights = await connectTable("flights", Flights_scheme, dbConnection);
	const flight_seats = await connectTable(
		"flight_seats",
		Flight_Seats_scheme,
		dbConnection
	);

	const bookings = await connectTable(
		"bookings",
		Bookings_scheme,
		dbConnection
	);
	const tickets = await connectTable("tickets", Tickets_scheme, dbConnection);
	const payments = await connectTable(
		"payments",
		Payments_scheme,
		dbConnection
	);
	console.log("-----------------------------------------------------------");
	console.log("CREATING ASSOCIATIONS");

	users.hasOne(logged_in, {
		foreignKey: "userId",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});
	logged_in.belongsTo(users);

	flights.hasMany(flight_seats, {
		foreignKey: "flightId",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});
	flight_seats.belongsTo(flights);

	plane_seats.hasMany(flight_seats, {
		foreignKey: "planeSeatId",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});
	plane_seats.belongsTo(planes);

	countries.hasMany(flights, {
		foreignKey: "originId",
		foreignKey: "destinationId",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});
	flights.belongsTo(countries);

	planes.hasMany(flights, {
		foreignKey: "planeId",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});
	flights.belongsTo(planes);

	users.hasMany(payments, {
		foreignKey: "userId",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});
	bookings.belongsTo(users);

	planes.hasMany(plane_seats, {
		foreignKey: "planeId",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});
	bookings.belongsTo(planes);

	console.log("-----------------------------------------------------------");
	console.log("VALIDATING TABLES");

	await validate_table(countries, "countries");
	await validate_table(users, "users");
	await validate_table(logged_in, "logged_in");
	await validate_table(planes, "planes");
	await validate_table(plane_seats, "plane_seats");
	await validate_table(flights, "flights");
	await validate_table(flight_seats, "flight_seats");
	await validate_table(tickets, "tickets");
	await validate_table(payments, "payments");
	await validate_table(bookings, "bookings");
	console.log("-----------------------------------------------------------");
	console.log("===========================================================");

	return {
		logged_in,
		users,
		flights,
		flight_seats,
		planes,
		plane_seats,
		bookings,
		tickets,
		payments,
		countries,
	};
};

const connectTable = async (tableName, tableScheme, dbConnection) => {
	let table = await dbConnection.define(tableName, tableScheme);
	let indent = "\t";
	if (tableName.length < 8) indent = "\t\t";
	console.log(`\t${tableName}${indent}TABLE CONNECTED`);
	return table;
};

const validate_table = async (table, tableName) => {
	await table
		.findAll({})
		.then(async () => {
			let indent = "\t";
			if (tableName.length < 8) indent = "\t\t";
			console.log(`\t${tableName}${indent}TABLE VALIDATED`);
		})
		.catch((err) => {
			console.log(err);
			console.log(`TABLE '${tableName}' NOT FOUND`);
			console.log(`CREATING '${tableName}' TABLE`);
			table.sync({ alter: true });
			setup_ORM();
		});
};
