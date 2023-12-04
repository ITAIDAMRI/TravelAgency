import React, { useState } from "react";
import {
	ContentSwitchingPageContainer,
	HorizontalContainer,
	PageTitle,
	VerticalContainer,
} from "../../Styles";
import Sidebar from "./Sidebar";
import Navbar from "../../Components/NavBar";

export default function AdminView(props) {
	return (
		<>
			<Navbar />
			{/* <HorizontalContainer> */}
			{/* <PageTitle>Admin Page</PageTitle> */}
			{/* </HorizontalContainer> */}
			<ContentSwitchingPageContainer>
				<Sidebar changeContent={props.changeContent} />
				{props.content}
			</ContentSwitchingPageContainer>
		</>
	);
}
