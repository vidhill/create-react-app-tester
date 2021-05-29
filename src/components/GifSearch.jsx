import React, { useState, useEffect } from "react";

import { getGiphySearchDownsampled } from "../services";
import { useLocalStorage } from "../hooks";
import { functionalUtils } from "../utils";

const { makePreventDefault } = functionalUtils;

const localStorageKey = "searchTerm";

const renderImage = (url, altText) => {
  if (url) {
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
    getGiphySearchDownsampled(inputText).then(updateImageUrl);
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
