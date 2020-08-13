import React, { useState, useEffect, useRef } from 'react';
import { navigate } from "hookrouter";
import axios from "axios";
import DropzoneComponent from 'react-dropzone-component';

import "../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../node_modules/dropzone/dist/min/dropzone.min.css";

const MemeForm = (props) => {
  const [text, setText] = useState("");
  const[favorite, setFavorite] = useState(false);
  const [image, setImage] = useState("");
  const imageRef = useRef(null);

  const componentConfig = () => {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    }
  }

  const djsConfig = () => {
    return {
      addRemovedLinks: true,
      maxFiles: 1
    }
  }

  const handleDrop = () => {
    return {
      addedfile: file => {
        const upload = request
          .post("https://api.cloudinary.com/v1_1/dgnj676da/image/upload")
          .field("upload_preset", "meme-images")
          .field("file", file)

          upload.end((err, res) => {
            if(err){
              console.log("cloudinary upload error: ", err);
            } else {
              if(res.body.secure_url) {
                setImage(res.body.secure_url)
              }
            }
        });
      },
    };
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    switch(props.id){
      case true:
        await fetch(`https://pjp-meme-api.herokuapp.com/meme/${props.id}`,{
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            text,
            favorite
          })
        })
          .then(() => imageRef.current.dropzone.removeAllFiles())
          .catch((err) => console.error("PUT Error: ", err));
        break
      default:

        axios
          .post("https://pjp-meme-api.herokuapp.com/add-meme", {
            text,
            favorite, 
            image,
          })
          .then(() => {
            setText("")
            setImage("")
            setFavorite(false)
            imageRef.current.dropzone.removeAllFiles();
          })
          .then(navigate("/"))
          .catch((err) => console.error("Handle Submit Error: ", err));
    }

  };

  useEffect(() => {
    if(props.id){
      fetch(`https://pjp-meme-api.herokuapp.com/memes/${props.id}`)
        .then(res => res.json())
        .then(data => {
          setText(data.text)
          setFavorite(data.favorite);
        })
    }
  },[])

    return (
    <div>
      <h1>{props.id ? "Edit Meme" : "Add a Meme"}</h1>
      <form onSubmit={handleSubmit}>
        <DropzoneComponent
          ref={imageRef}
          config={componentConfig()}
          djsConfig={djsConfig()}
          eventHandlers={handleDrop()}
        >
          Drop that sweet meme dawg
        </DropzoneComponent>
        <input
          type="text"
          placeholder="Caption"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div>
          <input
            type="checkbox"
            checked={favorite}
            onChange={() => setFavorite(!favorite)}
          />
          <span>Favorite?</span>
        </div>
        <button type="submit">{props.id ? "Update Meme" : "Post Meme"}</button>
      </form>
    </div>
  )
}

export default MemeForm;