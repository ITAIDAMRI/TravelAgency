import React from "react";
import { SidebarContainer, SidebarOption } from "./Sidebar.style";

export default function SidebarView(props) {
	const addOptions = () => {
		return (
			<>
				{props.options.map((option, index) => {
					return (
						<SidebarOption
							key={index}
							onClick={() => props.changeContent(option)}
						>
							{option}
						</SidebarOption>
					);
				})}
			</>
		);
	};

	return (
		<>
			<SidebarContainer>{addOptions()}</SidebarContainer>
		</>
	);
}
