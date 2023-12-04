import React, { useState } from "react";
import AdminView from "./AdminView";
import Overview from "./Overview";
import Planes from "./Planes";
import Countries from "./Countries";
import Tickets from "./Tickets/Tickets";
import Flights from "./Flights";
import PlaneSeats from "./PlaneSeats";
import Bookings from "./Bookings";
import Payments from "./Payments";

export default function AdminPage() {
	const [content, setContent] = useState(<PlaneSeats />);

	const changeContent = (option) => {
		switch (option) {
			case "Planes":
				setContent(<Planes />);
				break;
			case "Countries":
				setContent(<Countries />);
				break;
			case "Tickets":
				setContent(<Tickets />);
				break;
			case "Flights":
				setContent(<Flights />);
				break;
			case "Plane Seats":
				setContent(<PlaneSeats />);
				break;
			case "Bookings":
				setContent(<Bookings />);
				break;
			case "Payments":
				setContent(<Payments />);
				break;
		}
	};

	return <AdminView changeContent={changeContent} content={content} />;
}
