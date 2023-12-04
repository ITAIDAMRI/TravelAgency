import React from "react";
import DataTableView from "./DataTableView";

const DataTable = (props) => {
	console.log("props.deleteAction", props.deleteAction);
	return <DataTableView data={props.data} deleteAction={props.deleteAction} />;
};

export default DataTable;
