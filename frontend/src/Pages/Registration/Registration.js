import React from "react";
import RegistrationView from "./RegistrationView";
import { add_user } from "../../API/User_calls";
import { useNavigate } from "react-router-dom";

function Registration() {
	const navigate = useNavigate();

	const submitForm = async (userObj) => {
		if (await add_user(userObj)) {
			alert("You have registered");
			navigate("/");
		}
	};

	return <RegistrationView submitForm={submitForm} />;
}

export default Registration;
