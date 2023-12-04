import React, { useRef } from "react";
import {
	FormRecordContainer,
	FormRecordInput,
	FormRecordLabel,
	FormSubmit,
	PageTitle,
	VerticalContainer,
} from "../../Styles";
import { RegistrationForm } from "./Registration.style";
import Navbar from "../../Components/NavBar";

export default function RegistrationView(props) {
	const first_name = useRef(null);
	const last_name = useRef(null);
	const passport = useRef(null);
	const email = useRef(null);
	const password = useRef(null);

	const handleSubmit = () => {
		const userObj = {
			first_name: first_name.current.value,
			last_name: last_name.current.value,
			passport: passport.current.value,
			// email: email.current.value,
			password: password.current.value,
		};
		props.submitForm(userObj);
	};

	return (
		<VerticalContainer>
			<Navbar />
			<RegistrationForm>
				<PageTitle>Registration:</PageTitle>
				<FormRecordContainer>
					<FormRecordLabel>First Name:</FormRecordLabel>
					<FormRecordInput ref={first_name} />
				</FormRecordContainer>
				<FormRecordContainer>
					<FormRecordLabel>Last Name:</FormRecordLabel>
					<FormRecordInput ref={last_name} />
				</FormRecordContainer>
				<FormRecordContainer>
					<FormRecordLabel>Passport:</FormRecordLabel>
					<FormRecordInput ref={passport} />
				</FormRecordContainer>
				{/* <FormRecordContainer>
					<FormRecordLabel>Email:</FormRecordLabel>
					<FormRecordInput ref={email} />
				</FormRecordContainer> */}
				<FormRecordContainer>
					<FormRecordLabel>Password:</FormRecordLabel>
					<FormRecordInput ref={password} />
				</FormRecordContainer>
				<FormSubmit onClick={() => handleSubmit()}>Sign Up</FormSubmit>
			</RegistrationForm>
		</VerticalContainer>
	);
}
