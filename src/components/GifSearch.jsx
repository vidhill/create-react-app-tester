import React, { useState, useEffect } from "react";

import { giphySearchDownsampled } from "../services/giphyService";
import { useLocalStorage } from "../hooks";
import { makePreventDefault } from "../utils/functionalUtils";

const localStorageKey = "gif-search-term";
const testMode = true; // rendering image not required, set to false 

const renderImage = (url, altText) => {
  if (url && testMode) {
    return <img src={url} alt={"Gif of " + altText} />;
  }
  return null;
};

const GifSearch = () => {
  const [localStorageVal, updateLocalStorageVal] =
    useLocalStorage(localStorageKey);
  const [inputText, updateInputText] = useState(localStorageVal);
  const [imageUrl, updateImageUrl] = useState("");

  useEffect(() => {
    updateLocalStorageVal(inputText);
  }, [inputText, updateLocalStorageVal]);

  const submitHandler = () => {
    giphySearchDownsampled(inputText).then(updateImageUrl);
  };

  const changeHandler = (evt) => updateInputText(evt.target.value);
  const resetHandler = () => {
    updateInputText("");
    updateImageUrl("");
  };
  return (
    <React.Fragment>
      <form onSubmit={makePreventDefault(submitHandler)} action="#">
        <input type="text" value={inputText} onChange={changeHandler} />
      </form>
      <button onClick={resetHandler}>Reset</button>
      <p>{imageUrl}</p>
      {renderImage(imageUrl, inputText)}
    </React.Fragment>
  );
};

export default GifSearch;
