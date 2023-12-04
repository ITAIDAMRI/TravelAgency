import styled from "styled-components";
import Select from "react-select";
export const ParameterSelectionContainer = styled.div`
	display: grid;
	grid-template-columns: 0.7fr 1.5fr;
	gap: 12px;
	width: 100%;
	/* border: 1px solid black; */
	/* padding: 20px; */
`;

export const FlightSeatsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(15, 1fr);
	gap: 15px;
	justify-content: center;
	align-items: center;
	/* border: 1px solid black; */
	padding: 20px;
	width: 60%;
	button {
		width: 40px;
		padding: 5px;
		&:hover {
			background-color: green;
			cursor: pointer;
		}
	}
`;

export const EmptyFlightSeatCell = styled.button`
	border-radius: 30px;
`;

export const OccupiedFlightSeatCell = styled.button`
	border-radius: 30px;
	background-color: green;
	background: linear-gradient(to bottom, white, darkblue);
`;

export const FlightSelectorContainer = styled.div`
	display: grid;
	grid-template-columns: 0.3fr 1fr;
	width: 80%;
	/* gap: 50%; */
	margin: 10px;
	padding: 10px;
	justify-content: space-between;
	align-items: center;
	/* border: 1px solid black; */
`;

export const FlightSeatSignContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 90%;
	width: 80%;
`;

export const FlightPage = styled.div`
	display: grid;
	grid-template-columns: 300px 1fr;
	/* padding: 10px; */
	/* border: 1px solid black; */
	width: 100%;
	margin-left: 50px;
	/* gap: 100px;  */
`;
