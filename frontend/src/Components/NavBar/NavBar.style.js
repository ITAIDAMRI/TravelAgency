import styled from "styled-components";

export const NavbarContainer = styled.div`
	background-color: black;
	padding: 10px;
	display: flex;
	flex-direction: row;
	/* gap: 20px; */
	margin: 0px;
	width: 100%;
	color: white;
`;

export const NavbarOption = styled.a`
	background-color: transparent;
	text-decoration: none;
	&:hover {
		cursor: pointer;
		focused: true;
		color: yellow;
		font-weight: bold;
	}
	margin-left: 20px;
`;

export const UserGreetingContainer = styled.div`
	display: flex;
	justify-content: left;
	align-items: center;
	width: 20%;
	margin-left: 20px;
`;

export const UserGreetingLabel = styled.label`
	font-weight: bold;
	font-family: Arial;
`;
