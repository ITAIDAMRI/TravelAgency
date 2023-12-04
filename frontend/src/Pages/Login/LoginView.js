import React, { useRef } from "react";
import {
	FormRecordContainer,
	FormRecordInput,
	FormRecordLabel,
	FormSubmit,
	PageTitle,
	SignUpLink,
	VerticalContainer,
} from "../../Styles";
import Navbar from "../../Components/NavBar";
import { LoginForm, SignUpButton } from "./Login.style";

export default function LoginView(props) {
	const passport = useRef(null);
	const password = useRef(null);

	const handleSubmit = () => {
		const userObj = {
			passport: passport.current.value,
			password: password.current.value,
		};
		props.login(userObj);
	};

	return (
		<>
			<VerticalContainer>
				<Navbar />
				<LoginForm>
					<PageTitle>Login:</PageTitle>
					<FormRecordContainer>
						<FormRecordLabel>Passport:</FormRecordLabel>
						<FormRecordInput ref={passport} />
					</FormRecordContainer>
					<FormRecordContainer>
						<FormRecordLabel>Password:</FormRecordLabel>
						<FormRecordInput ref={password} />
					</FormRecordContainer>
					<FormRecordLabel>Don't have an account ?</FormRecordLabel>
					<SignUpButton onClick={() => props.goSignUp()}>Sign up</SignUpButton>
					<FormSubmit onClick={() => handleSubmit()}>Login</FormSubmit>
				</LoginForm>
			</VerticalContainer>
		</>
	);
}
