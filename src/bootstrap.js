import React from "react";
import ReactDOM from "react-dom";
import { useRoutes, A } from "hookrouter";

import "./style/main.scss";
import App from "./components/app";

const routes = {
	"/": () => <App />,
};

function Main() {
	return (
		<div>
			<div className="navbar">
				<A href="/">Home</A>
			</div>
			{useRoutes(routes)}
		</div>
	);
}

const main = () =>
	ReactDOM.render(<Main />, document.querySelector(".app-wrapper"));
document.addEventListener("DOMContentLoaded", main);
