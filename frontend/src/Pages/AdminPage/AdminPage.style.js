import styled from "styled-components";

export const AdminPageContentContainer = styled.div`
	display: grid;
	grid-template-columns: 0.5fr 1fr;
	border: 1px solid black;
	width: 80%;

	padding: 15px;
`;

export const AdminPageControlContainer = styled.div`
	margin-top: 13px;
	display: flex;
	flex-direction: column;
	/* width: 100%; */
	button {
		width: fit-content;
	}
`;
