import React from "react";
import {
	DataTBody,
	DataTCell,
	DataTH,
	DataTHeader,
	DataTOption,
	DataTRow,
	DataTable,
} from "./DataTable.style";
import shortid from "shortid";

const DataTableView = (props) => {
	const generateTable = () => {
		return (
			<>
				<DataTable key={shortid.generate()} overflow="auto">
					<DataTHeader key={shortid.generate()}>
						<DataTRow key={shortid.generate()}>
							{props.data.attributes.map((item, index) => {
								return <DataTH key={shortid.generate()}>{item}</DataTH>;
							})}
						</DataTRow>
					</DataTHeader>
					<DataTBody key={shortid.generate()}>
						{props.data.values.map((item, index) => {
							return (
								<DataTRow key={shortid.generate()}>
									{props.data.values[index].map((value, valIndx) => {
										return (
											<DataTCell key={shortid.generate()}>{value}</DataTCell>
										);
									})}
									{/* <DataTCell key={shortid.generate()}>
										<DataTOption key={shortid.generate()}>Update</DataTOption>
									</DataTCell> */}

									<DataTCell key={shortid.generate()}>
										<DataTOption
											key={shortid.generate()}
											onClick={() => props.deleteAction({ id: item[0] })}
										>
											Delete
										</DataTOption>
									</DataTCell>
								</DataTRow>
							);
						})}
					</DataTBody>
				</DataTable>
			</>
		);
	};

	return <>{generateTable()}</>;
};

export default DataTableView;
