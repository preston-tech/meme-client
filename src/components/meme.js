import React from "react";

export default function Meme(props, deleteMeme, editMeme) {
	const {id, text, favorite, image} = props
	return (
		<div className="meme">
			<div className="img-wrapper">
				<img className="meme-img" src={image} alt="some funny meme" />
			</div>

			<p>{text}</p>

			{favorite ? (
				<img
					src="https://library.kissclipart.com/20180830/fuw/kissclipart-twinkle-little-star-clip-art-clipart-twinkle-twin-0d72b7a5dc286d1e.jpg"
					alt="star"
				/>
			) : null}

			<button onClick={() => deleteMeme(id)}>Delete</button>
			<button onClick={() => editMeme(id)}>Edit</button>
		</div>
	);
}
