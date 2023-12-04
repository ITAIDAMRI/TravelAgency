import React, { useContext, useRef, useState } from "react";
import {
	FormRecordContainer,
	FormRecordInput,
	FormRecordLabel,
	FormSubmit,
	ManageButton,
	PageTitle,
	VerticalContainer,
} from "../../../Styles";
import { PlanesContext } from "./PlanesContext";
import DataTable from "../../../Components/DataTable";
import {
	AdminPageContentContainer,
	AdminPageControlContainer,
} from "../AdminPage.style";

export default function PlanesView() {
	const context = useContext(PlanesContext);
	console.log("context.deletePlane", context.deletePlane);
	const companyRef = useRef(null);
	const modelRef = useRef(null);
	const [displayForm, setDisplayForm] = useState(false);

	const generateForm = () => {
		if (!displayForm) return <></>;
		return (
			<VerticalContainer>
				<FormRecordContainer>
					<FormRecordLabel>Company:</FormRecordLabel>
					<FormRecordInput ref={companyRef} />
					<FormRecordLabel>Model:</FormRecordLabel>
					<FormRecordInput ref={modelRef} />
				</FormRecordContainer>
				<FormSubmit onClick={() => submit()}>Submit</FormSubmit>
			</VerticalContainer>
		);
	};

	const submit = () => {
		const requestObject = {
			company: companyRef.current.value,
			model: modelRef.current.value,
		};
		context.addPlane(requestObject);

		setDisplayForm(false);
	};

	const toggleForm = () => setDisplayForm(!displayForm);

	const deleteHandler = (requestObject) => {
		context.deletePlane(requestObject);
	};
	return (
		<>
			<VerticalContainer>
				<PageTitle>Planes</PageTitle>
				<AdminPageContentContainer>
					<AdminPageControlContainer>
						<ManageButton onClick={() => toggleForm()}>Add</ManageButton>
						{generateForm()}
					</AdminPageControlContainer>
					<DataTable
						data={{
							attributes: ["ID", "Company", "Model"],
							values: context.tableData,
						}}
						deleteAction={deleteHandler}
					/>
				</AdminPageContentContainer>
			</VerticalContainer>
		</>
	);
}
