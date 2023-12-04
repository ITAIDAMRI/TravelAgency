import React, { useEffect, useState } from "react";
import CartView from "./CartView";
import { useDispatch, useSelector } from "react-redux";
import {
	add_flight_seat,
	get_flight_seat_info_for_cart,
	verifySeatEmpty,
} from "../../API/Flight_Seat_calls";
import { clearCart, deleteItem } from "../../appState/cartSlice";
import { add_payment } from "../../API/Payment_calls";
import { useNavigate } from "react-router-dom";

const tableDataInitialState = {
	attributes: [
		"Seat",
		"Flight",
		"Origin",
		"Plane",
		"Destination",
		"Departs",
		"Date",
		"Price",
	],
	values: [],
};

const Cart = () => {
	const user = useSelector((state) => state.user);
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const [seatFlights, setSeatFlights] = useState([]);
	const [tableData, setTableData] = useState(tableDataInitialState);
	const [cartTotal, setCartTotal] = useState(0);
	const navigate = useNavigate();

	const refreshSeatInfo = async () => {
		if (!cart.items.length > 0) return;
		const seatsInfo = await get_flight_seat_info_for_cart({
			flight_seats: cart.items,
		});
		if (seatsInfo === undefined) return;
		const newTableValues = [];
		let totalValue = 0;
		for (const seat of seatsInfo) {
			totalValue = totalValue + seat.price_usd;
			const time = seat.depart.split(":")[0] + ":" + seat.depart.split(":")[1];
			const date = new Date(seat.date).toLocaleDateString("he-IL");
			const tableValueRow = [];
			tableValueRow.push(seat.seatNum);
			tableValueRow.push(seat.flightId);
			tableValueRow.push(seat.planeName);
			tableValueRow.push(seat.origin);
			tableValueRow.push(seat.destination);
			tableValueRow.push(time);
			tableValueRow.push(date);
			tableValueRow.push(seat.price_usd);
			newTableValues.push(tableValueRow);
		}

		setCartTotal(totalValue);

		setTableData({
			attributes: tableDataInitialState.attributes,
			values: newTableValues,
		});
	};

	const checkout = async () => {
		let allSeatsAvailable = true;
		const unavailableSeats = [];
		for (const cartItem of cart.items) {
			const seatAvailable = await verifySeatEmpty({
				planeSeatId: cartItem.id,
				flightId: cartItem.flightId,
			});
			console.log("QUERY", seatAvailable);

			if (!seatAvailable) {
				allSeatsAvailable = false;
				unavailableSeats.push({ cartItem });
			}
		}

		if (!allSeatsAvailable) {
			let alertString = "Seats:\n";
			for (const item of unavailableSeats) {
				alertString += `${item.seatNum} was not available\n`;
			}
			alert(alertString);
		}

		for (const cartItem of cart.items) {
			await add_flight_seat({
				planeSeatId: cartItem.id,
				flightId: cartItem.flightId,
			});
		}
		emptyCart();
		navigate("/Home");
		return true;
	};

	const emptyCart = () => {
		dispatch(clearCart());
	};

	const savePaymentRequest = async (paymentDetails) => {
		const timestamp = new Date();
		const time = timestamp.toLocaleTimeString("he-IL", {
			hour: "2-digit",
			minute: "2-digit",
		});

		const requestObject = {
			userId: user.id,
			creditor_first_name: paymentDetails.creditor_first_name,
			creditor_last_name: paymentDetails.creditor_last_name,
			creditor_id: paymentDetails.creditor_id,
			credit_card_number: paymentDetails.credit_card_number,
			amount: cartTotal,
			date: timestamp,
			time: time,
		};

		if (await add_payment(requestObject)) {
			alert("Your payment was successfully submitted");
		}
	};

	const deleteCartItem = (item) => {
		console.log("item", item);
		console.log("cart", cart);

		for (let i = 0; i < cart.items.length; i++) {
			if (cart.items[i].seatNum === parseInt(item.id)) {
				dispatch(deleteItem(cart.items[i]));
			}
		}
	};

	useEffect(() => {
		refreshSeatInfo();
	}, []);
	useEffect(() => {
		refreshSeatInfo();
	}, [cart]);

	return (
		<CartView
			tableData={tableData}
			cartTotal={cartTotal}
			checkout={checkout}
			clearCart={emptyCart}
			savePaymentRequest={savePaymentRequest}
			deleteCartItem={deleteCartItem}
		/>
	);
};

export default Cart;
