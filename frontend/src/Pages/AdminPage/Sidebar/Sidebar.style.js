import styled from "styled-components";
export const SidebarContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	background: linear-gradient(to bottom, darkblue, #0077c9, darkblue);
	padding: 15px;
	border-radius: 15px;
	box-shadow: 1px 1px 1px 1px black;
	height: 350px;
`;

export const SidebarOption = styled.a`
	background-color: transparent;
	text-decoration: none;
	border-radius: 15px;
	padding: 10px;
	&:hover {
		font-weight: bold;
		cursor: pointer;
		focused: true;
		color: black;
		background: skyblue;
	}
	width: 80%;
	text-align: center;
`;
