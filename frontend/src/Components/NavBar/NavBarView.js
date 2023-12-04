import React, { useContext } from "react";
import {
	NavbarContainer,
	NavbarOption,
	UserGreetingContainer,
	UserGreetingLabel,
} from "./NavBar.style";
import { useSelector } from "react-redux";
import { AppStateContext } from "../../AppUtils/AppStateContext";

export default function NavBarView(props) {
	const context = useContext(AppStateContext);
	const userFirstName = useSelector((state) => state.user.first_name);
	const userLastName = useSelector((state) => state.user.last_name);

	const displayGreeting = () => {
		return (
			<UserGreetingContainer>
				<UserGreetingLabel> Hello {props.userTitle}</UserGreetingLabel>
			</UserGreetingContainer>
		);
	};

	const addOptions = () => {
		return (
			<>
				{props.options.map((option, index) => {
					if (option === "Logout") {
						return (
							<NavbarOption key={index} onClick={() => handleLogout()}>
								{option}
							</NavbarOption>
						);
					}
					return (
						<NavbarOption key={index} onClick={() => props.goTo(option)}>
							{option}
						</NavbarOption>
					);
				})}
			</>
		);
	};

	const handleLogout = async () => {
		await context.logout();
	};

	return (
		<NavbarContainer>
			{displayGreeting()}
			{addOptions()}{" "}
		</NavbarContainer>
	);
}
