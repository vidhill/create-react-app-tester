
import React, { useState, useEffect } from "react";

import "./App.css";
import { giphyService } from "./services";
import { useLocalStorage } from "./hooks";

const localStorageKey = "searchTerm";

const renderImage = (url, altText) => {
  if (url) {
    return <img src={url} alt={"Gif of " + altText} />;
  }
  return null;
};

function App() {
  const [localStorageVal, updateLocalStorageVal] =
    useLocalStorage(localStorageKey);
  const [inputText, updateInputText] = useState(localStorageVal);
  const [imageUrl, updateImageUrl] = useState("");

  useEffect(() => {
    updateLocalStorageVal(inputText);
  }, [inputText, updateLocalStorageVal]);

  const submitHandler = (event) => {
    giphyService(inputText).then((resp) => {
      updateImageUrl(resp.fixed_height_downsampled_url);
    });
    event.preventDefault();
  };

  const changeHandler = (evt) => updateInputText(evt.target.value);
  const resetHandler = () => {
    updateInputText("");
    updateImageUrl("");
  };

  return (
    <div className="App">
      <header>App Header</header>
      <form onSubmit={submitHandler} action="#">
        <input type="text" value={inputText} onChange={changeHandler} />
      </form>
      <button onClick={resetHandler}>Reset</button>
      <p>{imageUrl}</p>
      {renderImage(imageUrl, inputText)}
      <footer>App footer</footer>
    </div>
  );
}

export default App;
