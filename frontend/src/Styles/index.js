import styled from "styled-components";

export const VerticalContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	width: 100%;
`;

export const HorizontalContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;

export const FormRecordContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
	padding; 10px;
	margin: 10px;
	width: 100%;
	/* border: 5px solid black; */
	padding: 5px;
`;

export const PageTitle = styled.h4`
	font-size: 24px;
`;

export const FormRecordLabel = styled.label`
	display: flex;
	justify-content: left;
	align-items: left;
	font-size: 20px;
`;

export const FormRecordInput = styled.input`
	background: transparent;
`;

export const FormSubmit = styled.button`
	border: 1px solid black;
	border-radius: 15px;
	padding: 10px;
	margin: 10px;
	width: 100%;
	&:hover {
		cursor: pointer;
		background-color: yellow;
	}
`;

export const SignUpLink = styled.a``;

export const ContentSwitchingPageContainer = styled.div`
	display: grid;
	grid-template-columns: 0.2fr 1fr;
	padding: 10px;
	/* border: 1px solid black; */
	width: 100%;
	/* margin-left: 50px; */
	gap: 100px;
`;

export const ManageButton = styled.button`
	border: 1px solid black;
	padding: 10px;
	margin: 10px;
	border-radius: 5px;
	width: 20%;
	&:hover {
		cursor: pointer;
		background-color: yellow;
	}
`;

export const FormSelect = styled.select`
	width: 30%;
`;

export const FormSelectOption = styled.option`
	width: 100%;
`;

export const SeatGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	gap: 10px;
`;

export const SeatItem = styled.label``;

