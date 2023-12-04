import React from "react";
import SidebarView from "./SidebarView";

export default function Sidebar(props) {
	const options = ["Planes", "Countries", "Flights", "Plane Seats"];

	const changeContent = (option) => {
		props.changeContent(option);
	};

	return <SidebarView options={options} changeContent={changeContent} />;
}
