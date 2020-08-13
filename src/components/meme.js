import React from "react";

export default function Meme({ text, favorite, image }) {
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

			<button>Delete</button>
			<button>Edit</button>
		</div>
	);
}
