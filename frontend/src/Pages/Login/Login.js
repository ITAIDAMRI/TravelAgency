import React, { useContext, useEffect } from "react";
import LoginView from "./LoginView";
import { login } from "../../API/User_calls";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../appState/userSlice";
import { AppStateContext } from "../../AppUtils/AppStateContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const navigate = useNavigate();
	const context = useContext(AppStateContext);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const submit = async (userObj) => {
		const queryResult = await login(userObj);
		if (queryResult.user === null) {
			alert("Invalid Username or Password !");
			return;
		}
		dispatch(setUser(queryResult.user));
	};

	const goSignUp = () => {
		navigate("/Register");
	};

	useEffect(() => {
		context.login();
	}, [user]);

	return <LoginView login={submit} goSignUp={goSignUp} />;
}
