import styled from "styled-components";

export const RegistrationForm = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 1px solid darkblue;
	border-radius: 15px;
	background: linear-gradient(to right bottom, #0077c9, #3d5a80, darkblue);
	padding: 20px;
	margin-top: 50px;
	height: 400px;
	color: white;
	width: 40%;

	box-shadow: 3px 3px 5px 1px black;
	button {
		width: 20%;
	}

	div {
		width: 60%;
		justify-content: center;
		align-items: center;
		input {
			width: 100%;
		}
	}

	input {
		border: 0.5px solid black;
	}
`;
