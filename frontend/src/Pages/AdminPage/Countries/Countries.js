import React, { useContext, useEffect, useState } from "react";
import CountriesView from "./CountriesView";
import { CountriesContext } from "./CountriesContext";
import {
	add_country,
	delete_country,
	get_all_countries,
} from "../../../API/Country_calls";
import { AppStateContext } from "../../../AppUtils/AppStateContext";

const initialDataTableState = { attributes: ["ID", "Name"], values: [[]] };

export default function Countries() {
	const [countries, setCountries] = useState([]);
	const [tableData, setTableData] = useState(initialDataTableState);
	const context = useContext(AppStateContext);
	const onPageStart = async () => {
		await context.validateUserLoggedIn();
	};

	const submitForm = async (country) => {
		if (await add_country({ name: country })) {
			refreshCountries();
		}
	};

	const refreshCountries = async (country) =>
		setCountries(await get_all_countries({}));

	const refreshTableData = async (tableData) => {
		if (countries.length === 0) return;
		const countryList = [];
		countries.forEach((country) => {
			const countryRow = [];
			countryRow.push(country.id);
			countryRow.push(country.name);
			countryList.push(countryRow);
		});
		setTableData({
			attributes: initialDataTableState.attributes,
			values: countryList,
		});
	};

	const deleteCountry = async (record) => {
		await delete_country(record);
		refreshCountries();
	};

	useEffect(() => {
		onPageStart();
		refreshCountries();
	}, []);
	useEffect(() => {
		refreshTableData();
	}, [countries]);

	return (
		<CountriesContext.Provider
			value={{
				countries: countries,
				submitForm: submitForm,
				tableData: tableData,
				deleteCountry: deleteCountry,
			}}
		>
			<CountriesView />
		</CountriesContext.Provider>
	);
}
