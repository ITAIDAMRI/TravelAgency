import express from "express";
import { createDBConnection } from "./database/DBConnectionModule.js";
import Baseline_route from "./routes/Baseline_route.js";
import User_route from "./routes/User_route.js";
import Auth_route from "./routes/Auth_route.js";
import bodyParser from "body-parser";
import Plane_route from "./routes/Plane_route.js";
import Plane_Seat_route from "./routes/Plane_Seat_route.js";
import Flight_Seat_route from "./routes/Flight_Seat_route.js";
import Booking_route from "./routes/Booking_route.js";
import Country_route from "./routes/Country_route.js";
import Ticket_route from "./routes/Ticket_route.js";
import Flight_route from "./routes/Flight_route.js";
import Payment_route from "./routes/Payment_route.js";

import cors from "cors";

const start_server = () => {
	const app = express();
	const PORT = 5000;

	try {
		app.listen(PORT, () => {
			console.log(`->\tSERVER RUNNING, LISTENING ON PORT ${PORT}`);
		});
	} catch (error) {
		console.log("error", error);
		start_server();
	}
	return app;
};

const allowedOrigins = ["http://localhost:3000"];

const options = {
	origin: allowedOrigins,
};

const config_routes = (app) => {
	app.use("/", Baseline_route);
	app.use("/users", User_route);
	app.use("/users", Auth_route);
	app.use("/planes", Plane_route);
	app.use("/plane_seats", Plane_Seat_route);
	app.use("/bookings", Booking_route);
	app.use("/countries", Country_route);
	app.use("/flight_seats", Flight_Seat_route);
	app.use("/tickets", Ticket_route);
	app.use("/flights", Flight_route);
	app.use("/payments", Payment_route);
};

const add_configs = (app) => {
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(cors(options));
	app.use(express.json());
};

const main = async () => {
	const app = start_server();
	add_configs(app);
	await createDBConnection();
	config_routes(app);
};

main();
