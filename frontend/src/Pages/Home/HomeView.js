import React, { useContext, useRef } from "react";
import { HomeContext } from "./HomeContext";
import Select from "react-select";
import {
	ContentSwitchingPageContainer,
	FormRecordContainer,
	FormRecordInput,
	FormRecordLabel,
	FormSubmit,
	PageTitle,
	VerticalContainer,
} from "../../Styles";
import {
	EmptyFlightSeatCell,
	FlightPage,
	FlightSeatSignContainer,
	FlightSeatsContainer,
	FlightSelectorContainer,
	OccupiedFlightSeatCell,
	ParameterSelectionContainer,
} from "./Home.style";
import shortid from "shortid";
import Navbar from "../../Components/NavBar";

export default function HomeView() {
	const context = useContext(HomeContext);
	const startDateRef = useRef(null);
	const endDateRef = useRef(null);
	const fromPriceRef = useRef(null);
	const toPriceRef = useRef(null);

	const showParameterSelector = () => {
		const originOptions = [];
		context.countries.forEach((country) => {
			originOptions.push({
				value: country,
				label: country.name,
			});
		});

		const destinationOptions = [];
		if (context.countries.length === 0)
			return <>No Destinations available...</>;
		context.countries.forEach((country) => {
			destinationOptions.push({
				value: country,
				label: country.name,
			});
		});

		return (
			<>
				<ParameterSelectionContainer>
					<FormRecordLabel>From:</FormRecordLabel>
					<Select
						options={originOptions}
						onChange={(selectedOption) => handleOriginSelect(selectedOption)}
					/>
					<FormRecordLabel>To:</FormRecordLabel>
					<Select
						options={destinationOptions}
						onChange={(selectedOption) =>
							handleDestinationSelect(selectedOption)
						}
					/>

					<FormRecordLabel>From Date:</FormRecordLabel>
					<FormRecordInput
						type="date"
						ref={startDateRef}
						onChange={() => context.setStartDate(startDateRef.current.value)}
					/>
					<FormRecordLabel>To Date:</FormRecordLabel>
					<FormRecordInput
						type="date"
						ref={endDateRef}
						onChange={() => context.setEndDate(endDateRef.current.value)}
					/>

					<FormRecordLabel>Start price:</FormRecordLabel>
					<FormRecordInput
						type="number"
						ref={fromPriceRef}
						onChange={() => context.setFromPrice(fromPriceRef.current.value)}
					/>

					<FormRecordLabel>High price:</FormRecordLabel>
					<FormRecordInput
						type="number"
						ref={toPriceRef}
						onChange={() => context.setToPrice(toPriceRef.current.value)}
					/>
				</ParameterSelectionContainer>
			</>
		);
	};

	const handleOriginSelect = (selectedOption) => {
		context.setOrigin(selectedOption.value);
	};

	const handleDestinationSelect = (selectedOption) => {
		context.setDestination(selectedOption.value);
	};

	const generateFlightsSelection = () => {
		if (context.flights.length === 0) return <></>;
		const flightOptions = [];
		context.flights.forEach((flight) => {
			// console.log("flight.date", flight.date);
			// const date = ;
			// console.log("date", date);
			const time = new Date(flight.depart_time);
			console.log("flight.depart_time", flight.depart_time);
			console.log("time", time);
			flightOptions.push({
				value: flight,
				label:
					"Flight:\t\t" +
					flight.id +
					"\t\t" +
					"On:\t\t" +
					new Date(flight.date).toLocaleDateString("he-IL") +
					"\t\t" +
					"Depart:\t\t" +
					flight.depart_time.split(":")[0] +
					":" +
					flight.depart_time.split(":")[1] +
					"\t\t" +
					"Price:\t\t" +
					flight.price_usd +
					"$",
			});
		});
		return (
			<>
				<VerticalContainer>
					<FlightSelectorContainer>
						<FormRecordLabel>Flight:</FormRecordLabel>
						<Select
							options={flightOptions}
							onChange={(selectedOption) =>
								handleFlightSelection(selectedOption)
							}
						/>
					</FlightSelectorContainer>
				</VerticalContainer>
			</>
		);
	};

	const handleFlightSelection = (selectedOption) => {
		context.setFlight(selectedOption.value);
	};

	const showFlightSeats = () => {
		if (context.planeFlightSeats.length === 0)
			return <>No seats available...</>;
		return (
			<VerticalContainer>
				<FlightSeatSignContainer>
					<FormRecordLabel>Head</FormRecordLabel>
					<FormRecordLabel>Tail</FormRecordLabel>
				</FlightSeatSignContainer>
				<FlightSeatsContainer>
					{context.planeFlightSeats.map((seat) => {
						if (!seat.occupied) {
							return (
								<EmptyFlightSeatCell
									key={shortid.generate()}
									onClick={() => handleSelectSeat(seat)}
								>
									{seat.seatNum}
								</EmptyFlightSeatCell>
							);
						} else {
							return (
								<OccupiedFlightSeatCell
									key={shortid.generate()}
									onClick={() => handleSelectSeat(seat)}
								>
									{seat.seatNum}
								</OccupiedFlightSeatCell>
							);
						}
					})}
				</FlightSeatsContainer>
			</VerticalContainer>
		);
	};

	const handleSelectSeat = (seat) => {
		context.reserveSeat(seat);
	};

	const handleSubmitFlights = () => {
		context.searchFlights();
	};

	return (
		<VerticalContainer>
			<Navbar />
			<PageTitle>Where are we going ?</PageTitle>
			<FlightPage>
				<VerticalContainer>
					{showParameterSelector()}
					<FormSubmit onClick={() => handleSubmitFlights()}>
						Search Flights
					</FormSubmit>
				</VerticalContainer>
				<VerticalContainer>
					{generateFlightsSelection()}
					{showFlightSeats()}
				</VerticalContainer>
			</FlightPage>
		</VerticalContainer>
	);
}
