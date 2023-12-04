import React, { useEffect, useRef, useState } from "react";
import {
	CartButton,
	CartGrid,
	CartLabel,
	CartTotalContainer,
	PaymentSection,
	ProductSectionContainer,
} from "./Cart.style";
import {
	FormRecordContainer,
	FormRecordInput,
	FormRecordLabel,
	HorizontalContainer,
	VerticalContainer,
} from "../../Styles";
import Navbar from "../../Components/NavBar";
import DataTable from "../../Components/DataTable";

const CartView = (props) => {
	const payerFirstNameRef = useRef(null);
	const payerLastNameRef = useRef(null);
	const creditCardRef = useRef(null);
	const payerIdRef = useRef(null);
	const [saveDetails, setSaveDetails] = useState(false);

	const checkout = async () => {
		const reserveResult = await props.checkout();
		console.log("reserveResult", reserveResult);
		if (!reserveResult) return;
		if (!saveDetails) return;
		const paymentDetails = {
			creditor_first_name: payerFirstNameRef.current.value,
			creditor_last_name: payerLastNameRef.current.value,
			creditor_id: payerIdRef.current.value,
			credit_card_number: creditCardRef.current.value,
		};
		await props.savePaymentRequest(paymentDetails);
	};

	const clearCart = () => {
		props.clearCart();
	};

	const showTable = () => {
		if (
			props.tableData.values.length === 0 ||
			props.tableData.values[0][0] === undefined
		) {
			return (
				<>
					<CartLabel>{"Cart Empty"}</CartLabel>
				</>
			);
		} else {
			return (
				<ProductSectionContainer>
					<CartButton onClick={() => clearCart()}>Clear</CartButton>
					<DataTable
						data={props.tableData}
						deleteAction={props.deleteCartItem}
					/>
				</ProductSectionContainer>
			);
		}
		return <></>;
	};

	return (
		<VerticalContainer>
			<Navbar />
			<CartGrid>
				{showTable()}

				<PaymentSection>
					<FormRecordContainer>
						<CartLabel>Total:</CartLabel>
						<CartLabel>{props.cartTotal}</CartLabel>
						<FormRecordLabel>First Name:</FormRecordLabel>
						<FormRecordInput ref={payerFirstNameRef} />
						<FormRecordLabel>Last Name:</FormRecordLabel>
						<FormRecordInput ref={payerLastNameRef} />
						<FormRecordLabel>ID:</FormRecordLabel>
						<FormRecordInput ref={payerIdRef} />
						<FormRecordLabel>Credit Card:</FormRecordLabel>
						<FormRecordInput ref={creditCardRef} />
					</FormRecordContainer>
					<HorizontalContainer>
						<FormRecordLabel>Save details ?</FormRecordLabel>
						<FormRecordInput
							type="checkbox"
							onChange={(event) => setSaveDetails(!saveDetails)}
						/>
					</HorizontalContainer>
					<CartButton onClick={() => checkout()}>Checkout</CartButton>
				</PaymentSection>
			</CartGrid>
		</VerticalContainer>
	);
};

export default CartView;
