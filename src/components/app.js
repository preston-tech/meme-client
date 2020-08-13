import React, { useState, useEffect } from "react";
import {navigate} from "hookrouter";
import axios from "axios";

import Meme from "./meme";

export default function App() {
	const [memes, setMemes] = useState([]);

	const editMeme = id => {
		navigate(`/form/${id}`)
	}

	const deleteMeme = id => {
		axios
		  .delete(`https://pjp-meme-api.herokuapp.com/delete-meme/${id}`)
		  .then(() => setMemes(memes.filter(meme => meme.id !== id)))
		  .catch(err => console.error("Delete Meme Err: ", err))
	}

	const renderMemes = () => {
		return memes.map((meme) => {
			return <Meme key={meme.id} {...meme} deleteMeme={deleteMeme} editMeme={editMeme}/>;
		});
	};

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetch("https://pjp-meme-api.herokuapp.com/memes")
				.then((res) => res.json())
				.then((data) => setMemes(data))
				.catch((err) => console.error(err));
		};

		fetchData();
	}, []);

	return <div className="app">{renderMemes()}</div>;
}
