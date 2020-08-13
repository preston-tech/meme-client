import React from "react";
import ReactDOM from "react-dom";
import { useRoutes, A } from "hookrouter";

import "./style/main.scss";
import App from "./components/app";
import MemeForm from "./components/memeForm";

const routes = {
	"/": () => <App />,
	"/form": () => <MemeForm />,
	"/form/:id": ({ id }) => <MemeForm id={id} />,
	
};

function Main() {
	return (
		<div>
			<div className="navbar">
				<A href="/">Home</A>
				<A href="/form">Form</A>
			</div>
			{useRoutes(routes)}
		</div>
	);
}

const main = () =>
	ReactDOM.render(<Main />, document.querySelector(".app-wrapper"));
document.addEventListener("DOMContentLoaded", main);
