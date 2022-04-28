// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const GIPHY_API = "https://api.giphy.com/v1/gifs/search?api_key=LAAF0kFO1k4r2AO21N300DO36mgNOWxF&q=hi&limit=25&offset=0&rating=g&lang=en";
  let [search, setSearch] = useState("");
  let [gifs, setGifs] = useState([]);
  let [loadingState, setLoadingState] = useState(false);
  let searchGif = () => {
    if(search.length > 0){
      setLoadingState(true);
      fetch(GIPHY_API+search)
      .then((res)=>{
        setLoadingState(false);
        return res.json();
      })
      .then((result)=>{
        console.log(result);
        setGifs(result.data.map((gif)=>{
          return gif.images.fixed_height.url;
        }))
      })
      .catch(()=>{
        alert("Something went wrong");
        setLoadingState(false);
      })
    }
  }
  return (
    <div>
    <div className="header">
      <div>
        <input 
          type="text" 
          placeholder="Enter Someting"
          value={search}
          onChange={(e)=>setSearch(e.target.value)} 
        />
        <button onClick={searchGif}>
          Search
        </button>
      </div>
    </div>
    <div className="result">
      {
        (loadingState) ? (
          <div className="loading">
            <div className="loader">
            </div>
          </div>
        ) : (
          <div className="list">
            {
              gifs.map((gif)=>{
                return (
                  <div className="item">
                    <img src={gif}/>  
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  </div>
  );
}

export default App;
