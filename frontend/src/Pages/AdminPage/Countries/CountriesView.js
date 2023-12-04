import React, { useContext, useRef, useState } from "react";
import {
	FormRecordContainer,
	FormRecordInput,
	FormRecordLabel,
	FormSubmit,
	PageTitle,
	VerticalContainer,
} from "../../../Styles";
import ReactSelect from "react-select";
import { CountriesContext } from "./CountriesContext";
import DataTable from "../../../Components/DataTable";
import {
	AdminPageContentContainer,
	AdminPageControlContainer,
} from "../AdminPage.style";

export default function CountriesView() {
	const context = useContext(CountriesContext);
	const countryRef = useRef(null);
	const [displayForm, setDisplayForm] = useState(false);

	const generateForm = () => {
		if (!displayForm) return <></>;
		return (
			<VerticalContainer>
				<FormRecordContainer>
					<FormRecordLabel>Name:</FormRecordLabel>
					<FormRecordInput ref={countryRef} />
				</FormRecordContainer>
				<FormSubmit onClick={() => submitForm()}>Submit </FormSubmit>
			</VerticalContainer>
		);
	};

	const submitForm = () => {
		context.submitForm(countryRef.current.value);
	};
	const toggleShowForm = () => setDisplayForm(!displayForm);

	const showTable = () => {
		if (context.tableData === undefined) return <>loading..</>;
		return (
			<DataTable
				data={context.tableData}
				deleteAction={context.deleteCountry}
			/>
		);
	};

	return (
		<>
			<VerticalContainer>
				<PageTitle>Countries</PageTitle>
				<AdminPageContentContainer>
					<AdminPageControlContainer>
						<FormSubmit onClick={() => toggleShowForm()}>Add New</FormSubmit>
						{generateForm()}
					</AdminPageControlContainer>
					{showTable()}
				</AdminPageContentContainer>
			</VerticalContainer>
		</>
	);
}
