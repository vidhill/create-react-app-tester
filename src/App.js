import './App.css';
import React, { useState, useEffect } from "react";
import { giphyService } from "./services";

const localStorageKey = "searchTerm"

function App() {
  const [inputText, setInputText] = useState(window.localStorage.getItem(localStorageKey));
  const [imageUrl, seImageUrl] = useState("");

  useEffect(()=>{
    window.localStorage.setItem(localStorageKey, inputText) 
  }, [inputText])    

  const submitHandler = (evt)=>{
    giphyService(inputText).then((resp)=> {
      seImageUrl(resp.fixed_height_downsampled_url)
    })
    evt.preventDefault();
  }

  const changeHandler = (evt)=> setInputText(evt.target.value)
  const resetHandler = ()=> {
    setInputText("");
    seImageUrl("");
  }


  return (
    <div className="App"> 
      <header>My Header</header>
      <form onSubmit={submitHandler} action="#">
        <input type="text" value={inputText} onChange={changeHandler} />
      </form>
      <button onClick={resetHandler}>Reset</button>
      <p>{imageUrl}</p>
      <footer>My footer</footer>
    </div>
  );
}

export default App;
