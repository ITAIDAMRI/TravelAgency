import React, { useContext, useMemo, useRef, useState } from "react";
import {
	FormRecordContainer,
	FormRecordInput,
	FormRecordLabel,
	FormSelect,
	FormSelectOption,
	FormSubmit,
	ManageButton,
	PageTitle,
	SeatGrid,
	SeatItem,
	VerticalContainer,
} from "../../../Styles";
import shortid from "shortid";
import Select from "react-select";
import { PlaneSeatsContext } from "./PlaneSeatsContext";
import DataTable from "../../../Components/DataTable/DataTable";
import {
	AdminPageContentContainer,
	AdminPageControlContainer,
} from "../AdminPage.style";

const PlaneSeatsView = () => {
	const context = useContext(PlaneSeatsContext);
	const numberRef = useRef(null);
	const [displayForm, setDisplayForm] = useState(false);
	const toggleDisplayForm = () => setDisplayForm(!displayForm);

	const checkSelectedPlane = (plane) => {
		if (context.selectedPlane === undefined) return false;
		return plane.id === context.selectedPlane.id;
	};

	const generatePlanesSelector = () => {
		const options = [];
		context.planes.forEach((plane) => {
			options.push({
				value: plane,
				label: plane.model + " " + plane.company,
			});
		});
		return (
			<Select
				options={options}
				onChange={(selectedOption) => handlePlaneChange(selectedOption)}
			/>
		);
	};

	const handlePlaneChange = (selectedOption) => {
		context.selectPlane(selectedOption.value.id);
	};

	const generateForm = () => {
		if (!displayForm) return <></>;
		return (
			<>
				<VerticalContainer>
					<FormRecordContainer>
						<FormRecordLabel>How many:</FormRecordLabel>
						<FormRecordInput ref={numberRef} type="number" />
					</FormRecordContainer>
					<FormSubmit onClick={() => submitForm()}>Submit</FormSubmit>
				</VerticalContainer>
			</>
		);
	};

	const submitForm = () => {
		context.addSeats(numberRef.current.value);
	};

	const selectPlane = (plane) => {
		context.selectPlane(plane);
	};

	const generateSeatsGrid = () => {
		if (context.planeSeats.length === 0) return <></>;
		return (
			<SeatGrid>
				{context.planeSeats.map((item) => {
					return <SeatItem>{item.SeatId}</SeatItem>;
				})}
			</SeatGrid>
		);
	};

	return (
		<VerticalContainer>
			<PageTitle>Plane Seats</PageTitle>
			<AdminPageContentContainer>
				<AdminPageControlContainer>
					{generatePlanesSelector()}
					<ManageButton onClick={() => toggleDisplayForm()}>Add</ManageButton>

					{generateForm()}
				</AdminPageControlContainer>
				{generateSeatsGrid()}
				<DataTable
					data={context.tableData}
					deleteAction={context.deletePlaneSeat}
				/>
			</AdminPageContentContainer>
		</VerticalContainer>
	);
};

export default PlaneSeatsView;
