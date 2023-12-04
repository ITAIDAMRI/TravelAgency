import React, { useContext, useRef, useState } from "react";
import { FlightsContext } from "./FlightsContext";
import {
	FormRecordContainer,
	FormRecordInput,
	FormRecordLabel,
	FormSubmit,
	PageTitle,
	VerticalContainer,
} from "../../../Styles";
import Select from "react-select";
import DataTable from "../../../Components/DataTable/DataTable";
import {
	AdminPageContentContainer,
	AdminPageControlContainer,
} from "../AdminPage.style";

const FlightsView = () => {
	const context = useContext(FlightsContext);
	const [displayForm, setDisplayForm] = useState(false);
	const dateRef = useRef(null);
	const timeRef = useRef(null);
	const durationRef = useRef(null);
	const priceRef = useRef(null);
	const planeRef = useRef(null);

	const toggleDisplayForm = () => setDisplayForm(!displayForm);

	// const handleOriginSelect = (selectedOption) =>
	// 	context.setOrigin(selectedOption.value.id);
	// const handleDestinationSelect = (selectedOption) =>
	// 	context.setDestination(selectedOption.value.id);
	// const handleDateSelect = (selectedOption) =>
	// 	context.setDate(selectedOption.value.id);

	const generateForm = () => {
		if (!displayForm) return <></>;
		if (context.countries.length === 0 || context.planes.length === 0)
			return <>loading...</>;
		const planesOptions = [];
		context.planes.forEach((plane) => {
			const planeOption = {
				value: plane,
				label: plane.company + " " + plane.model,
			};
			planesOptions.push(planeOption);
		});
		const countriesOptions = [];
		context.countries.forEach((country) => {
			const countryOption = { value: country, label: country.name };
			countriesOptions.push(countryOption);
		});
		return (
			<>
				<VerticalContainer>
					<FormRecordContainer>
						<FormRecordLabel>From:</FormRecordLabel>
						<Select
							options={countriesOptions}
							onChange={(selectedOption) => handleSelectOrigin(selectedOption)}
						/>
						<FormRecordLabel>To:</FormRecordLabel>
						<Select
							options={countriesOptions}
							onChange={(selectedOption) =>
								handleSelectDestination(selectedOption)
							}
						/>
						<FormRecordLabel>Plane:</FormRecordLabel>
						<Select
							ref={planeRef}
							options={planesOptions}
							onChange={(selectedOption) => {
								handleSelectPlane(selectedOption);
							}}
						/>
						<FormRecordLabel>Date:</FormRecordLabel>
						<FormRecordInput ref={dateRef} type="date" />
						<FormRecordLabel>Departure:</FormRecordLabel>
						<FormRecordInput ref={timeRef} type="time" />
						<FormRecordLabel>Duration:</FormRecordLabel>
						<FormRecordInput ref={durationRef} type="number" />
						<FormRecordLabel>Price (USD):</FormRecordLabel>
						<FormRecordInput ref={priceRef} type="number" />
					</FormRecordContainer>
					<FormSubmit onClick={() => submitForm()}>Submit</FormSubmit>
				</VerticalContainer>
			</>
		);
	};

	const handleSelectOrigin = (selectedOption) =>
		context.setSelectedOrigin(selectedOption.value);
	const handleSelectDestination = (selectedOption) =>
		context.setSelectedDestination(selectedOption.value);
	const handleSelectPlane = (selectedOption) =>
		context.setSelectedPlane(selectedOption.value);

	const submitForm = () => {
		const requestObject = {
			planeId: context.selectedPlane.id,
			originId: context.selectedOrigin.id,
			destinationId: context.selectedDestination.id,
			date: dateRef.current.value,
			duration_minutes: durationRef.current.value,
			depart_time: timeRef.current.value,
			price_usd: priceRef.current.value,
		};
		context.submitForm(requestObject);
	};

	const showTable = () => {
		if (context.tableData === undefined) return <>loading..</>;
		return (
			<DataTable data={context.tableData} deleteAction={context.deleteFlight} />
		);
	};

	return (
		<>
			<VerticalContainer>
				<PageTitle>Flights</PageTitle>
				<AdminPageContentContainer>
					<AdminPageControlContainer>
						<FormSubmit onClick={() => toggleDisplayForm()}>Add new</FormSubmit>
						{generateForm()}
					</AdminPageControlContainer>
					{showTable()}
				</AdminPageContentContainer>
			</VerticalContainer>
		</>
	);
};

export default FlightsView;
