import React, { useState, useEffect } from "react";
import axios from "axios";

import Meme from "./meme";

export default function App() {
	const [memes, setMemes] = useState([]);

	const renderMemes = () => {
		return memes.map((meme) => {
			return <Meme key={meme.id} {...meme} />;
		});
	};

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetch("https://rec-meme-flask.herokuapp.com/memes")
				.then((res) => res.json())
				.then((data) => setMemes(data))
				.catch((err) => console.error(err));
		};

		fetchData();
	}, []);

	return <div className="app">{renderMemes()}</div>;
}
