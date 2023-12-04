import styled from "styled-components";

export const CartGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 0.7fr;
	gap: 50px;
	margin: 50px;
`;

export const ProductSectionContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const PaymentSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
`;

export const CartTotalContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
`;
export const CartLabel = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
`;

export const CartButton = styled.button`
	text-align: center;
	padding: 10px;
	width: fit-content;
	border-radius: 15px;
`;
